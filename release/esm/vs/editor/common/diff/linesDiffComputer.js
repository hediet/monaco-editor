/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export class LineRangeMapping {
    constructor(originalRange, modifiedRange, 
    /**
     * Meaning of `undefined` unclear.
    */
    innerChanges) {
        this.originalRange = originalRange;
        this.modifiedRange = modifiedRange;
        this.innerChanges = innerChanges;
    }
    toString() {
        return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
    }
}
export class RangeMapping {
    constructor(originalRange, modifiedRange) {
        this.originalRange = originalRange;
        this.modifiedRange = modifiedRange;
    }
    toString() {
        return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
    }
}
/**
 * 1-based.
*/
export class LineRange {
    constructor(startLineNumber, endLineNumberExclusive) {
        this.startLineNumber = startLineNumber;
        this.endLineNumberExclusive = endLineNumberExclusive;
    }
    get isEmpty() {
        return this.startLineNumber === this.endLineNumberExclusive;
    }
    toString() {
        return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
    }
    join(other) {
        return new LineRange(Math.min(this.startLineNumber, other.startLineNumber), Math.max(this.endLineNumberExclusive, other.endLineNumberExclusive));
    }
}
