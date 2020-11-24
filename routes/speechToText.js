// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs').promises;

const express = require('express')
const router = express.Router()



router.post('/', async (req, res, next) => {
  console.log("inside ")
  try {
    const transcription = await quickstart(req.body.audio)
    res.status(200).json({
      transcription
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
})

const config1 = {
  projectId: 'my-first-project-288409',
  keyFilename: 'C://Users//8825903797//Downloads//My First Project-b71d76206ade.json'
};
const client = new speech.v1.SpeechClient(config1);

async function quickstart(audioBytes) {
  // The name of the audio file to transcribe
  // const fileName = './speech.raw';

  // // Reads a local audio file and converts it to base64
  // const file = await fs.readFile(fileName);
  // const audioBytes = file.toString('base64');

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };
  console.log('before google');

  const [operation] = await client.longRunningRecognize(request);
  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
  return transcription;

}
module.exports = router;






