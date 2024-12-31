// src/utils/videoProcessing.js
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

export async function processVideo(videoFile, trimConfig) {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }

  const inputFileName = 'input.mp4';
  const outputFileName = 'output.mp4';

  ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));

  const duration = trimConfig.end - trimConfig.start;
  
  await ffmpeg.run(
    '-i', inputFileName,
    '-ss', `${trimConfig.start}`,
    '-t', `${duration}`,
    '-c', 'copy',
    outputFileName
  );

  const data = ffmpeg.FS('readFile', outputFileName);
  return new Blob([data.buffer], { type: 'video/mp4' });
}