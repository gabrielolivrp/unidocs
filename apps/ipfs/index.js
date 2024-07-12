import crypto from "node:crypto";
import { create } from "ipfs-core";
import express from "express";
import cors from "cors";
import Joi from "joi";
import "dotenv/config";

const port = process.env.PORT || 3005;
const app = express();
const ipfs = await create();
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const decrypt = (text) => {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf-8");
};

app.post("/api/storage", async (req, res) => {
  const schema = Joi.object({
    chunks: Joi.object().required(),
  });

  try {
    const validated = schema.validate(req.body);
    if (validated.error) {
      return res.status(400).json({ errors: validated.error.details });
    }
    const { chunks } = validated.value;

    const cids = {};
    for (const [index, chunk] of Object.entries(chunks)) {
      const data = encrypt(JSON.stringify({ part: index, chunk }));
      const cid = await ipfs.add(data);
      cids[index] = cid.path;
    }

    res.json({ cids });
  } catch (error) {
    res.status(500).json({ errors: [{ message: error.message }] });
  }
});

app.post("/api/get", async (req, res) => {
  const schema = Joi.object({
    cids: Joi.array().items(Joi.string()).required(),
  });

  try {
    const validated = schema.validate(req.body);
    if (validated.error) {
      return res.status(400).json(validated.error.details);
    }
    const { cids } = validated.value;

    const chunks = {};
    for (const cid of cids) {
      const buffer = [];
      for await (const chunk of await ipfs.cat(cid)) {
        buffer.push(chunk);
      }
      chunks[cid] = JSON.parse(decrypt(Buffer.concat(buffer).toString()));
    }

    res.status(200).json({ chunks });
  } catch (error) {
    res.status(500).json({ errors: [{ message: error.message }] });
  }
});

app.listen(port, () =>
  console.log(`ipfs is running at http://localhost:${port}`)
);
