import path from 'node:path';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.resolve(process.cwd(), 'uploads', 'musics');

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.mp3';
    const name = `${randomUUID()}${ext.toLowerCase()}`;
    cb(null, name);
  },
});

function fileFilter(_req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
  if (file.mimetype === 'audio/mpeg' || file.originalname.toLowerCase().endsWith('.mp3')) {
    cb(null, true);
  } else {
    cb(new Error('Arquivo inválido. Envie um MP3.'));
  }
}

export const uploadMusic = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});
