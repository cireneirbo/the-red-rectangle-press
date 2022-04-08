const fs = require('fs')
const YoutubeMp3Downloader = require('youtube-mp3-downloader')
const { Deepgram } = require('@deepgram/sdk')
const ffmpeg = require('ffmpeg-static')
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

//* Initialize Clients *//
const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY)
const YD = new YoutubeMp3Downloader({
  ffmpegPath: ffmpeg,
  outputPath: './',
  youtubeVideoQuality: 'highestaudio',
})

//* Download Audio From YouTube *//
YD.download('ir-mWUYH_uo')

YD.on('progress', (data) => {
  console.log(data.progress.percentage + '% downloaded')
})

YD.on('finished', async (err, video) => {
  const videoFileName = video.file
  console.log(`Downloaded ${videoFileName}`)

  //* Convert Audio to Text with DeepGram *//
  const file = {
    buffer: fs.readFileSync(videoFileName),
    mimetype: 'audio/mp3',
  }
  const options = {
    punctuate: true,
    utterances: true,
  }

  const result = await deepgram.transcription
    .preRecorded(file, options)
    .catch((e) => console.log(e))
  console.log(result.toWebVTT())
})







//* Sendgrid Email Process *//
// Declare parameters for email
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const emailTo = process.env.SENDGRID_EMAIL_RECEIVER;
const emailFrom = process.env.SENDGRID_EMAIL_SENDER;
const emailSubject = "SendGrid Test Email";
const emailText = "This is my second email. Can you read it without the HTML added?";
const emailHTML = `<p>${emailText}</p>`;

// Create the email
const msg = {
  to: emailTo,
  from: emailFrom, // Use the email address or domain you verified above
  subject: emailSubject,
  text: emailText,
  html: emailHTML,
};

// Send the email
(async () => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
})();