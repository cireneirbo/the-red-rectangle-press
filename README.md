# the-red-rectangle-press
▄▄▄▄▄▄   ▄▄▄▄▄▄▄ ▄▄▄▄▄▄     ▄▄▄▄▄▄   ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄ ▄▄    ▄ ▄▄▄▄▄▄▄ ▄▄▄     ▄▄▄▄▄▄▄    ▄▄▄▄▄▄▄ ▄▄▄▄▄▄   ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ 
█   ▄  █ █       █      █   █   ▄  █ █       █       █       █      █  █  █ █       █   █   █       █  █       █   ▄  █ █       █       █       █
█  █ █ █ █    ▄▄▄█  ▄    █  █  █ █ █ █    ▄▄▄█       █▄     ▄█  ▄   █   █▄█ █   ▄▄▄▄█   █   █    ▄▄▄█  █    ▄  █  █ █ █ █    ▄▄▄█  ▄▄▄▄▄█  ▄▄▄▄▄█
█   █▄▄█▄█   █▄▄▄█ █ █   █  █   █▄▄█▄█   █▄▄▄█     ▄▄█ █   █ █ █▄█  █       █  █  ▄▄█   █   █   █▄▄▄   █   █▄█ █   █▄▄█▄█   █▄▄▄█ █▄▄▄▄▄█ █▄▄▄▄▄ 
█    ▄▄  █    ▄▄▄█ █▄█   █  █    ▄▄  █    ▄▄▄█    █    █   █ █      █  ▄    █  █ █  █   █▄▄▄█    ▄▄▄█  █    ▄▄▄█    ▄▄  █    ▄▄▄█▄▄▄▄▄  █▄▄▄▄▄  █
█   █  █ █   █▄▄▄█       █  █   █  █ █   █▄▄▄█    █▄▄  █   █ █  ▄   █ █ █   █  █▄▄█ █       █   █▄▄▄   █   █   █   █  █ █   █▄▄▄ ▄▄▄▄▄█ █▄▄▄▄▄█ █
█▄▄▄█  █▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄█   █▄▄▄█  █▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█ █▄▄▄█ █▄█ █▄▄█▄█  █▄▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█  █▄▄▄█   █▄▄▄█  █▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█

An application that converts the audio from a YouTube video to text and then sends it via email.

### Hackathon Category
* Accessibility Advocates: Use Deepgram to improve user accessibility. Think about user input, accessing media or live events, and improving understanding.

## What It Does
RRP is a utility tool to increase the accessibility of content on YouTube. There are many reasons why someone might prefer an emailed transcript over the original video, some of which include:
* Limited hearing ability.
* Captions are not available for that video.
* Wifi access will be limited at a time when the user could watch the video.
* To be able to search for keywords and only digest the parts they are interested in.
* To use the content in an article or research project. 

## Getting Started
* Clone or fork this repo.
* Open in your IDE of choice and install dependents with `npm install` in the command line.
* Set up your environmental variables by duplicating the `.env-sample` file and renaming it `.env`.
* In the new file, `.env`:
  * Add your DeepGram API key to `DEEPGRAM_API_KEY="your-secret-key"`
    * If you do not have one already, go to `https://console.deepgram.com/signup?utm_medium=github&utm_source=DEVREL&utm_content=node-sdk` and obtain a free API key.
  * Add your SendGrid Mail API key to `SENDGRID_API_KEY="your-twilio-sendgrid-api-key"`
    * If you do not have one already, got to `https://sendgrid.com/pricing/` and obtain a free email API key.
  * Add your sender's email address to `SENDGRID_EMAIL_SENDER="your-email@thatdomain.com"`
* Run the program in the command line with `npm start` and follow the prompts.

## Dependencies 
* [YouTube mp3 Downloader](https://www.npmjs.com/package/youtube-mp3-downloader) - Youtube MP3 Downloader is a module which allows to specify YouTube videos from which the audio data should be extracted, converted to MP3, and stored on disk.
* [DeepGram SDK](https://github.com/deepgram/deepgram-node-sdk) - Official Node.js SDK for Deepgram's automated speech recognition APIs.
* [ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static) - ffmpeg static binaries for Mac OSX, Linux, Windows.
* [SendGrid Mail](https://www.npmjs.com/package/@sendgrid/mail) - This is a dedicated service for interaction with the mail endpoint of the SendGrid v3 API.
* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
* [fs](https://nodejs.org/api/fs.html#file-system) - The fs module enables interacting with the file system in a way modeled on standard POSIX functions.
* [readline-sync](https://www.npmjs.com/package/readline-sync) - Synchronous Readline for interactively running to have a conversation with the user via a console(TTY).
