import connecttoDB from '@utils/database';
import Prompt from '@models/prompt';
import { connect } from 'mongoose';

//GET
// GET request to retrieve a prompt by ID
export const GET = async (request, { params }) => {
    try {
        await connecttoDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        
        if (!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error("Error fetching prompt:", error);
        return new Response("Failed to fetch prompt", { status: 500 });
    }
};

//PATCH (UPDATE)

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connecttoDB();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) 
            return new Response("Prompt not found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });

    } catch (error) {
        return new Response("Failed to update the prompt", { status: 500 });
    }
};


//DELETE (DELETE)
export const DELETE = async (request, {params}) => {
    try {
        await connecttoDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully", {status: 200});
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500})
    }
}