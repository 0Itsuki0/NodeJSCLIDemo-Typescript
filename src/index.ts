#!/usr/bin/env node

import { select, Separator } from '@inquirer/prompts';
import terminalImage from 'terminal-image';

try {

    const answer = await select({
        message: `Select Itsuki's favorite pokemon `,
        choices: [
            {
                name: 'pikachu',
                value: 'pikachu',
                description: 'Pikachu is the best',
            },
            new Separator(),
            {
                name: 'ditto',
                value: 'ditto',
                disabled: true,
            },
            {
                name: 'bulbasaur',
                value: 'bulbasaur',
                disabled: '(please choose pikachu for me!)',
            },
        ],
    });
    console.log("Thank you for choosing ", answer)
    console.log("Please wait... ")

    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${answer}`)
    const pokemonBody: {
        [key: string]: any;
    } = await pokemonResponse.json()

    const imageResponse = await fetch(pokemonBody["sprites"]["other"]["official-artwork"]["front_default"]);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(await terminalImage.buffer(buffer, { width: '50%', height: '50%' }));
} catch (error) {
    if (error instanceof Error) {
        console.log("Oops! Program Finish with Error: ", error.message);
    } else {
        console.log("Oops! Something went wrong!", error);
    }
}
