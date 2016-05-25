import Point = require('./point');
import Range = require('./range');

import Disposable = require('../event-kit/Disposable');

declare namespace TextBuffer {
  export var Point: Point;
  export var Range: Range;
}

declare class TextBuffer {
  constructor(params: string | { load: boolean, text: string });
  onWillChange(callback: (event: {
    oldRange: Range,
    newRange: Range,
    oldText: string,
    newText: string
  }) => void): Disposable;
  onDidChange(callback: (event: {
    oldRange: Range,
    newRange: Range,
    oldText: string,
    newText: string
  }) => void): Disposable;
  onDidStopChanging: (callback: () => void) => Disposable;
  onDidConflict: (callback: () => void) => Disposable;
  onDidChangeModified(callback: (modified: boolean) => void): Disposable;
  onDidUpdateMarkers: (callback: () => void) => Disposable;
  onDidCreateMarker(callback: (marker: TextEditorMarker) => void): Disposable;
  onDidChangePath(callback: (path: string) => void): Disposable;
  onDidChangeEncoding(callback: (encoding: string) => void): Disposable;
  onWillSave: (callback: () => void) => Disposable;
  onDidSave(callback: (event: { path: string }) => void): Disposable;
  onDidDelete: (callback: () => void) => Disposable;
  onWillReload: (callback: () => void) => Disposable;
  onDidReload: (callback: () => void) => Disposable;
  onDidDestroy: (callback: () => void) => Disposable;
  onWillThrowWatchError(callback: (errorObject: {
    error: Object,
    handle(): void
  }) => void): Disposable;
  getStoppedChangingDelay(): number;
  isModified(): boolean;
  isInConflict(): boolean;
  getPath(): string;
  setPath(filePath: string): void;
  setEncoding(encoding: string): void;
  getEncoding(): string;
  getUri(): string;
  isEmpty(): boolean;
  getText(): string;
  getTextInRange(range: Range): string;
  getLines(): string[];
  getLastLine(): string;
  lineForRow(row: number): string;
  lineEndingForRow(row: number): '\n' | '\r' | '\r\n' | '';
  lineLengthForRow(row: number): number;
  isRowBlank(row: number): boolean;
  previousNonBlankRow(startRow: number): number;
  nextNonBlankRow(startRow: number): number;
  setText(text: string): Range;
  setTextViaDiff(text: string): any;
  setTextInRange(range: Range, text: string, options?: { normalizeLineEndings?: boolean, undo?: 'skip' }): Range;
  insert(position: Point, text: string, options?: { normalizeLineEndings?: boolean, undo?: 'skip' }): Range;
  append(text: string, options?: { normalizeLineEndings?: boolean, undo?: 'skip' }): Range;
  delete(range: Range): Range;
  deleteRow(row: number): Range;
  deleteRows(startRow: number, endRow: number): Range;
  addMarkerLayer(options: { maintainHistory: boolean }): MarkerLayer;
  getMarkerLayer(id: any): MarkerLayer;
  markRange(range: Range | Point[], properties: {
    reversed?: boolean,
    persistent?: boolean,
    invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
  }): Marker;
  markPosition(position: Point | number[], properties: {
    reversed?: boolean,
    persistent?: boolean,
    invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
  }): Marker;
  getMarkers(): Marker[];
  getMarker(id: number): Marker;
  /**
   * @params params A hash of key-value pairs constraining the set of returned markers.
   * You can query against custom marker properties by listing the desired key-value pairs here.
   * In addition, the following keys are reserved and have special semantics:
   *    startPosition	Only include markers that start at the given Point.
   *    endPosition Only include markers that end at the given Point.
   *    containsPoint Only include markers that contain the given Point, inclusive.
   *    containsRange	Only include markers that contain the given Range, inclusive.
   *    startRow Only include markers that start at the given row Number.
   *    endRow Only include markers that end at the given row Number.
   *    intersectsRow Only include markers that intersect the given row Number.
   */
  findMarkers(params: {
    startPosition?: Point,
    endPosition?: Point,
    containsPoint?: Point,
    containsRange?: Range,
    startRow?: number,
    endRow?: number;
    intersectsRow?: number
  }): Marker[];
  getMarkerCount(): number;
  undo(): void;
  redo(): void;
  transact(fn: () => void): void;
  transact(groupingInterval: number, fn: () => void): void;
  clearUndoStack(): void;
  createCheckpoint(): any;
  revertToCheckpoint(): boolean;
  groupChangesSinceCheckpoint(): boolean;
  scan: ScanFunction;
  backwardsScan: ScanFunction;
  scanInRange: ScanInRangeFunction;
  backwardsScanInRange: ScanInRangeFunction;
  replace(regex: RegExp, replacementText: string): number;
  getRange(): Range;
  getLineCount(): number;
  getLastRow(): number;

  getFirstPosition(): Point;
  getEndPosition(): Point;
  getMaxCharacterIndex(): number;
  rangeForRow(row: number, includeNewline: boolean): Range;
  characterIndexForPosition(position: Point): number;
  positionForCharacterIndex(offset: number): Point;
  clipRange(range: Range): Range;
  clipPosition(position: Point): Point;
  save(): void;
  saveAs(filePath: string): void;
  reload(): void;
}

export = TextBuffer;
