import { loadQARefineChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/document";
import * as dotenv from "dotenv";
import path from 'path'

dotenv.config();

export async function textGenrator(msg) {
    // Create the models and chain
    const embeddings = new OpenAIEmbeddings();
    const model = new OpenAI({ temperature: 0, maxTokens: 100, modelName: 'text-babbage-001' });
    // modelName: 'text-babbage-001'
    // text-ada-001
    const chain = loadQARefineChain(model);

    const __dirname = path.resolve();
    const loader = new TextLoader(path.join(__dirname, "data/about_saylani.txt"));

    // const docs = await loader.loadAndSplit();
    const rawDoc = await loader.load();
    const doc = rawDoc[0].pageContent.replace(/(\r\n|\n|\r)/gm, " ")

    const docs = [
        new Document({ pageContent: doc }),
    ];

    const question = msg;
    if (question) {
        const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

        const relevantDocs = await store.similaritySearch(question);

        // Call the chain
        const res = await chain.call({
            input_documents: relevantDocs,
            question,
        });
        // return res.output_text
        console.log(res.output_text);
        let text = res.output_text
        text = text.split('?')
        if (text.length > 1) {
            text = text[1].trim()
        } else if (text.length > 0) {
            text = text[0].trim()
        } else {
            text = text.trim()
        }
        console.log(text);
        return text
    }
}
