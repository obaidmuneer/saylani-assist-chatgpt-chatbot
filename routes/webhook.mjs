import { Router } from 'express';
import UTILS from '../helpers/utils.mjs';
import { textGenrator } from '../helpers/textGenrator.mjs';


const router = Router()

router.post('/', async (req, res) => {
    const body = req.body
    const query = body.queryResult.queryText
    const intentName = body.queryResult.intent.displayName
    const params = body.queryResult.parameters

    let resData = {};

    try {
        switch (intentName) {
            case 'Default Fallback Intent':
                console.log(query);
                const resposne = await textGenrator(query)
                resData = UTILS.response(resposne)
                break;

            default:
                resData = UTILS.response(`I'm sorry, I didn't understand that. Can you please rephrase or provide more information?`);
                break;
        }

        res.send(resData);

    } catch (error) {
        console.error(error);
        UTILS.response(`Oops! Something went wrong. Please try again later.`);
        res.send(resData);
    }
});

export default router