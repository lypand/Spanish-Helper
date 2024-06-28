const express = require('express');
const axios = require('axios');
const router = express.Router()
module.exports = router;
const Model = require('../models/model');

const baseURL = 'https://dictionaryapi.com/api/v3/references/spanish/json';
const axiosInstance = axios.create({
    baseURL: baseURL
});

router.post('/vocab_entries', async (req, res) => {
    const data = new Model({
        spanish: req.body.spanish,
        english: req.body.english,
        exampleEnglish: req.body.exampleEnglish,
        exampleSpanish: req.body.exampleSpanish,
        conjugations: req.body.conjugations,
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Post Method
router.get('/draft_vocab_entries', async (req, res) => {
    const response = await axiosInstance.get(`/${req.query.spanish}?key=0264a0de-3422-49b0-bf81-77174ebb7e88`);

    let spanish = req.query.spanish;
    let english = [];
    let conjugations = null;
    let englishExample = [];
    let spanishExample = [];

    if (response?.data !== undefined && response?.data.length > 0) {
        const data = response.data[0];
        if (data?.shortdef !== undefined) {
            for (let shortdef of data.shortdef) {
                english.push(shortdef);
            }
        }
        if (data?.suppl?.cjts !== undefined) {
            conjugations = data?.suppl?.cjts;
        }
        if (data.def) {
            data.def.flatMap(def1 =>
                def1.sseq?.flatMap(sseq =>
                    sseq?.flatMap(sseq1 =>
                        sseq1?.flatMap(sseq2 =>
                            sseq2.dt?.flatMap(dt =>
                                dt?.flatMap(dt1 =>
                                    Array.isArray(dt1) ?  // Check if dt1 is an array
                                        dt1.filter(dt2 => {
                                            if (dt2.tr !== undefined) {
                                                englishExample.push(dt2.tr);
                                            }
                                            if (dt2.t !== undefined) {
                                                spanishExample.push(dt2.t);
                                            }
                                        })
                                        : [] // If not an array, return an empty array
                                )
                            )
                        )
                    )
                )
            );
        }
    }

    const data = {
        spanish: spanish,
        english: english,
        exampleEnglish: englishExample,
        exampleSpanish: spanishExample,
        conjugations: conjugations,
    }

    try {
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/vocab_entries', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
