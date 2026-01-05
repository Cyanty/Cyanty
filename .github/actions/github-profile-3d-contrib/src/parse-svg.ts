import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import * as type from './type';
import axios from 'axios';

const SVG_PATH = join(__dirname, '../spec/language-stats.svg');

function parseSvgLanguages(svgPath: string): type.LangInfo[] {
    const svg = readFileSync(svgPath, 'utf-8');
    const langs: type.LangInfo[] = [];
    const regex = /<circle[^>]+fill="([^"]+)"[^>]*\/>\s*<text[^>]*>\s*([^\s]+)\s+([\d.]+)%/g;
    let match;

    while ((match = regex.exec(svg)) !== null) {
        langs.push({
            color: match[1],
            language: match[2],
            contributions: parseFloat(match[3])
        });
    }

    return langs;
}

export async function fetchAndParseSvg(
    username: string,
    langsCount: number = 10,
    hide: string = 'HTML,CSS'
): Promise<type.LangInfo[]> {
    const url = `https://github-readme-stats-fast.vercel.app/api/top-langs/?username=${username}&langs_count=${langsCount}&hide=${hide}&layout=compact&title_color=007bff&text_color=000000&icon_color=007bff&bg_color=ffffff`;

    try {
        const res = await axios.get(url, { timeout: 10000 });
        writeFileSync(SVG_PATH, res.data);
        console.log('SVG fetched and saved successfully');
    } catch (err) {
        console.log('Fetch failed, using existing SVG file');
        if (!existsSync(SVG_PATH)) {
            throw new Error('No existing SVG file found');
        }
    }

    return parseSvgLanguages(SVG_PATH);
}
