const fs = require('fs');
const YoutubeMp3Downloader = require('youtube-mp3-downloader');
const { Deepgram } = require('@deepgram/sdk');
const ffmpeg = require('ffmpeg-static');
const sgMail = require('@sendgrid/mail');
const input = require('readline-sync');
require('dotenv').config();

//* Initialize Clients *//
const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);
const YD = new YoutubeMp3Downloader({
  ffmpegPath: ffmpeg,
  outputPath: './',
  youtubeVideoQuality: 'lowestaudio',
  queueParallelism: 2,
  progressTimeout: 5000,
});
let audioToTextTranscript = "";

//* Get input and instruct the user *//
console.log(`
▄▄▄▄▄▄   ▄▄▄▄▄▄▄ ▄▄▄▄▄▄     ▄▄▄▄▄▄   ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄ ▄▄    ▄ ▄▄▄▄▄▄▄ ▄▄▄     ▄▄▄▄▄▄▄    ▄▄▄▄▄▄▄ ▄▄▄▄▄▄   ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ 
█   ▄  █ █       █      █   █   ▄  █ █       █       █       █      █  █  █ █       █   █   █       █  █       █   ▄  █ █       █       █       █
█  █ █ █ █    ▄▄▄█  ▄    █  █  █ █ █ █    ▄▄▄█       █▄     ▄█  ▄   █   █▄█ █   ▄▄▄▄█   █   █    ▄▄▄█  █    ▄  █  █ █ █ █    ▄▄▄█  ▄▄▄▄▄█  ▄▄▄▄▄█
█   █▄▄█▄█   █▄▄▄█ █ █   █  █   █▄▄█▄█   █▄▄▄█     ▄▄█ █   █ █ █▄█  █       █  █  ▄▄█   █   █   █▄▄▄   █   █▄█ █   █▄▄█▄█   █▄▄▄█ █▄▄▄▄▄█ █▄▄▄▄▄ 
█    ▄▄  █    ▄▄▄█ █▄█   █  █    ▄▄  █    ▄▄▄█    █    █   █ █      █  ▄    █  █ █  █   █▄▄▄█    ▄▄▄█  █    ▄▄▄█    ▄▄  █    ▄▄▄█▄▄▄▄▄  █▄▄▄▄▄  █
█   █  █ █   █▄▄▄█       █  █   █  █ █   █▄▄▄█    █▄▄  █   █ █  ▄   █ █ █   █  █▄▄█ █       █   █▄▄▄   █   █   █   █  █ █   █▄▄▄ ▄▄▄▄▄█ █▄▄▄▄▄█ █
█▄▄▄█  █▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄█   █▄▄▄█  █▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█ █▄▄▄█ █▄█ █▄▄█▄█  █▄▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█  █▄▄▄█   █▄▄▄█  █▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█

>>> Greetings! Welcome to the Red Rectangle Press!
>>> This is a program which can email you a transcript of a YouTube video.
>>> It is simple to use, and only requires a few user inputs.
>>> Let's begin!

>>> Navigate to YouTube to find the video you'd like to extract an audio transcript from.
>>> An example video is this: 
https://www.youtube.com/watch?v=0L5TQJbH1gg

>>> Now only copy the video ID, which is the query string that follows the '?v='.
>>> Our example's is:
0L5TQJbH1gg

>>> You will be using this video ID string for the first input.

`);

let videoLink = input.question(">>> Paste your video ID here: ");

//* Download Audio From YouTube *//
YD.download(videoLink) // create an input asking for a unique video id

// While downloading...
YD.on('progress', (data) => {
  console.log(data.progress.percentage + '% downloaded');
})

// If downloading error...
YD.on("error", function(error) {
  console.log(error);
});

// When download has finished...
YD.on('finished', async (err, video) => {
  const videoFileName = video.file;
  console.log(`Downloaded ${videoFileName}`);

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
    .catch((e) => console.log(e));

  audioToTextTranscript = result.results.channels[0].alternatives[0].transcript;

  // Delete the mp3
  fs.unlinkSync(videoFileName);

  //* Sendgrid Email Process *//
  console.log(`\n>>> Now we need to find out where this transcript is going.\n`);
  let emailToInput = input.question(">>> Paste the email address that you are sending the transcript to:  ");

  // Declare parameters for email
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const emailTo = emailToInput;
  const emailFrom = process.env.SENDGRID_EMAIL_SENDER;
  const emailSubject = "transcript of: " + videoFileName + " || The Red Rectangle Press";
  const emailText = `
  This is a transcript created using DeepGram, a voice-to-text AI.\n
  
  The original video can be viewed here:\n
  https://www.youtube.com/watch?v=${videoLink}\n\n

  ${audioToTextTranscript}\n\n
  

  ---------------\n
  Sent via the Red Rectangle Press (https://github.com/cireneirbo/the-red-rectangle-press)
  `;
  const emailHTML = `<div>
  <h3>This is a transcript created using DeepGram, a voice-to-text AI.</h3>
  
  <h4>The original video can be viewed here:</h4>
  <a href="https://www.youtube.com/watch?v=${videoLink}">https://www.youtube.com/watch?v=${videoLink}</a>
  <br>
  <p>${audioToTextTranscript}</p>
  
  <br>
  <h3>---------------</h3>
  <h4>Sent via the <a href="https://github.com/cireneirbo/the-red-rectangle-press">Red Rectangle Press</a></h4>
  </div>`;

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
      console.log(">>> Email has been sent to " + emailTo);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();

});