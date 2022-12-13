/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export class SequenceDiff {
    constructor(seq1Range, seq2Range) {
        this.seq1Range = seq1Range;
        this.seq2Range = seq2Range;
    }
}
/**
 * Todo move this class to some top level utils.
*/
export class OffsetRange {
    constructor(start, endExclusive) {
        this.start = start;
        this.endExclusive = endExclusive;
    }
    get length() {
        return this.endExclusive - this.start;
    }
}
export class SequenceFromIntArray {
    constructor(arr) {
        this.arr = arr;
    }
    getElement(offset) {
        return this.arr[offset];
    }
    get length() {
        return this.arr.length;
    }
}
