import * as fs from "fs";
import * as path from "path";
import { CodeFileExtension, NonCodeFileExtension, Annotation, AnnotationType } from "./types";


export function scanFiles(directory: string, extensions: (CodeFileExtension | NonCodeFileExtension)[]): string[] {
    const files = fs.readdirSync(directory);
    const results = [];
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (file.startsWith(".") || file === "node_modules") { continue; }
        if (fs.statSync(fullPath).isDirectory()) { results.push(...scanFiles(fullPath, extensions)) }
        if (extensions.includes(path.extname(fullPath).replace(".", "") as CodeFileExtension | NonCodeFileExtension)) { results.push(fullPath) }
    }
    return results;
}

export function parseFile(filePath: string): Annotation[] {
    const annotations: Annotation[] = [];
    const file = fs.readFileSync(filePath, 'utf-8');
    const lines = file.split("\n");
    lines.forEach((line, index) => {
        const lineNum = index + 1;
        const words = line.split(" ");
        const annotationIndex: number = words.findIndex(word => Object.values(AnnotationType).includes(word as AnnotationType));
        if (annotationIndex !== -1) {
            const annotationType = words[annotationIndex] as AnnotationType;
            const comment = words.slice(annotationIndex + 1).join(" ").trim() || "No comment";
            const annotation: Annotation = {
                annotationType: annotationType,
                annotationLine: lineNum,
                comment: comment,
                filePath: filePath
            }
            annotations.push(annotation);
        }
    });
    return annotations;
}