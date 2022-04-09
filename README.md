# the-red-rectangle-press
An application that converts the audio from a YouTube video to text and then sends it via email.

## The Plan
* Have an Express server.
* Create a basic index/home page.
* Get user input of URL for YouTube video.
* Get user input for the email address they want to send the transcript to.
* Use Deepgram API to convert the audio into text.
* Send text transcript to the user's email address.
* Clear form and post message saying email was succesful or not.

## Dependencies 
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
* [YouTube mp3 Downloader](https://www.npmjs.com/package/youtube-mp3-downloader) - Youtube MP3 Downloader is a module which allows to specify YouTube videos from which the audio data should be extracted, converted to MP3, and stored on disk.
* [DeepGram SDK](https://github.com/deepgram/deepgram-node-sdk) - Official Node.js SDK for Deepgram's automated speech recognition APIs.
* [ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static) - ffmpeg static binaries for Mac OSX, Linux, Windows.

## Dev and Deepgram Hackathon

### Dev 
* [Dev Hackathon Post](https://dev.to/devteam/join-us-for-a-new-kind-of-hackathon-on-dev-brought-to-you-by-deepgram-2bjd) - Join us for a new kind of hackathon on DEV — brought to you by Deepgram!

### Deepgram
* [Deepgram API Reference](https://developers.deepgram.com/api-reference/#authentication) - Deepgram's API gives you streamlined access to Deepgram products, including automatic transcription from Deepgram's off-the-shelf and trained speech recognition models, and to all of your Deepgram resources, such as your account's projects, API keys, billing settings and balances, and usage statistics.
* [Deepgram Home Page](https://deepgram.com/) - Deepgram provides developers with the tools you need to easily add AI speech recognition to applications. We can handle practically any audio file format and deliver at lightning speed for the best voice experiences.

### Hackathon Category
* Accessibility Advocates: Use Deepgram to improve user accessibility. Think about user input, accessing media or live events, and improving understanding.