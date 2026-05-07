import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

app.post('/api/keycrm-lead', async (req, res) => {
  try {
    const { name, phone, position, quizResult } = req.body;

    const payload = {
      title: `Квіз вакансій — ${name || phone}`,

      pipeline_id: 1,
      source_id: 39,

      contact: {
        full_name: name,
        phone: phone
      },

      manager_comment:
        `Посада: ${position}\nРезультат квізу: ${quizResult}`
    };

    const response = await fetch(
      'https://openapi.keycrm.app/v1/leads',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.KEYCRM_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    console.log(data);

    res.json(data);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});