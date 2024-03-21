import { create } from "ipfs-core";
import express from "express";
import cors from "cors";
import Joi from "joi";
import "dotenv/config";

const port = process.env.PORT || 3005;
const app = express();
const ipfs = await create();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

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
      chunks[cid] = JSON.parse(Buffer.concat(buffer).toString());
    }

    res.status(200).json({ chunks });
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ message: "Error retrieving file from IPFS" }] });
  }
});

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
      const cid = await ipfs.add(JSON.stringify({ index, chunk }));
      cids[index] = cid.path;
    }

    res.json({ cids });
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ message: "Error uploading chunks to IPFS." }] });
  }
});

app.listen(port, () =>
  console.log(`ipfs is running at http://localhost:${port}`)
);
