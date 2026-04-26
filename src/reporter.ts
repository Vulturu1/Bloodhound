import * as fs from "fs";
import { Annotation, AnnotationType } from "./types";

interface AnnotationGroup {
    annotationType: AnnotationType;
    groupedAnnotations: Annotation[];
}

export function formatByType(annotations: Annotation[]): AnnotationGroup[] {
    const grouped: AnnotationGroup[] = []
    for (const annoType of Object.values(AnnotationType)) {
        const outputAnnos = annotations.filter(annotation => annotation.annotationType === annoType);
        if (!outputAnnos) { continue; }
        const annoGroup: AnnotationGroup = {
            annotationType: annoType,
            groupedAnnotations: outputAnnos
        }
        grouped.push(annoGroup);
    }
    return grouped;
}

export function formatByFile(annotations: Annotation[]) {
    const uniquePaths = [...new Set(annotations.map(a => a.filePath))];
}

//console.log(`=== ${outputAnnos.length} ${annoType}'s Found ================`)
//        for (const annotation of outputAnnos) {
//            console.log("\n");
//            console.log(`Annotation Type | ${annotation.annotationType} on line ${annotation.annotationLine}`);
//            console.log(`Comment         | ${annotation.comment}`);
//            console.log(`Path to file    | ${annotation.filePath}`);
//        }