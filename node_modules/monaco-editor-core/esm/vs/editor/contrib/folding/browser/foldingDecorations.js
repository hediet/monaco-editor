/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Codicon } from '../../../../base/common/codicons.js';
import { ModelDecorationOptions } from '../../../common/model/textModel.js';
import { localize } from '../../../../nls.js';
import { registerIcon } from '../../../../platform/theme/common/iconRegistry.js';
import { ThemeIcon } from '../../../../platform/theme/common/themeService.js';
export const foldingExpandedIcon = registerIcon('folding-expanded', Codicon.chevronDown, localize('foldingExpandedIcon', 'Icon for expanded ranges in the editor glyph margin.'));
export const foldingCollapsedIcon = registerIcon('folding-collapsed', Codicon.chevronRight, localize('foldingCollapsedIcon', 'Icon for collapsed ranges in the editor glyph margin.'));
export const foldingManualIcon = registerIcon('folding-manual', Codicon.ellipsis, localize('foldingManualIcon', 'Icon for manually collapsed ranges in the editor glyph margin.'));
export class FoldingDecorationProvider {
    constructor(editor) {
        this.editor = editor;
        this.showFoldingControls = 'mouseover';
        this.showFoldingHighlights = true;
    }
    getDecorationOption(isCollapsed, isHidden, isManualSelection) {
        if (isHidden // is inside another collapsed region
            || this.showFoldingControls === 'never' || (isManualSelection && !isCollapsed)) { //
            return FoldingDecorationProvider.HIDDEN_RANGE_DECORATION;
        }
        if (isCollapsed) {
            return isManualSelection ?
                (this.showFoldingHighlights ? FoldingDecorationProvider.MANUALLY_COLLAPSED_HIGHLIGHTED_VISUAL_DECORATION : FoldingDecorationProvider.MANUALLY_COLLAPSED_VISUAL_DECORATION)
                : (this.showFoldingHighlights ? FoldingDecorationProvider.COLLAPSED_HIGHLIGHTED_VISUAL_DECORATION : FoldingDecorationProvider.COLLAPSED_VISUAL_DECORATION);
        }
        else if (this.showFoldingControls === 'mouseover') {
            return FoldingDecorationProvider.EXPANDED_AUTO_HIDE_VISUAL_DECORATION;
        }
        else {
            return FoldingDecorationProvider.EXPANDED_VISUAL_DECORATION;
        }
    }
    changeDecorations(callback) {
        return this.editor.changeDecorations(callback);
    }
    removeDecorations(decorationIds) {
        this.editor.removeDecorations(decorationIds);
    }
}
FoldingDecorationProvider.COLLAPSED_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: 'folding-collapsed-visual-decoration',
    stickiness: 1 /* TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges */,
    afterContentClassName: 'inline-folded',
    isWholeLine: true,
    firstLineDecorationClassName: ThemeIcon.asClassName(foldingCollapsedIcon)
});
FoldingDecorationProvider.COLLAPSED_HIGHLIGHTED_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: 'folding-collapsed-highlighted-visual-decoration',
    stickiness: 1 /* TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges */,
    afterContentClassName: 'inline-folded',
    className: 'folded-background',
    isWholeLine: true,
    firstLineDecorationClassName: ThemeIcon.asClassName(foldingCollapsedIcon)
});
FoldingDecorationProvider.MANUALLY_COLLAPSED_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: 'folding-manually-collapsed-visual-decoration',
    stickiness: 1 /* TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges */,
    afterContentClassName: 'inline-folded',
    isWholeLine: true,
    firstLineDecorationClassName: ThemeIcon.asClassName(foldingManualIcon)
});
FoldingDecorationProvider.MANUALLY_COLLAPSED_HIGHLIGHTED_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: 'folding-manually-collapsed-highlighted-visual-decoration',
    stickiness: 1 /* TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges */,
    afterContentClassName: 'inline-folded',
    className: 'folded-background',
    isWholeLine: true,
    firstLineDecorationClassName: ThemeIcon.asClassName(foldingManualIcon)
});
FoldingDecorationProvider.EXPANDED_AUTO_HIDE_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: 'folding-expanded-auto-hide-visual-decoration',
    stickiness: 1 /* TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges */,
    isWholeLine: true,
    firstLineDecorationClassName: ThemeIcon.asClassName(foldingExpandedIcon)
});
FoldingDecorationProvider.EXPANDED_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: 'folding-expanded-visual-decoration',
    stickiness: 1 /* TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges */,
    isWholeLine: true,
    firstLineDecorationClassName: 'alwaysShowFoldIcons ' + ThemeIcon.asClassName(foldingExpandedIcon)
});
FoldingDecorationProvider.HIDDEN_RANGE_DECORATION = ModelDecorationOptions.register({
    description: 'folding-hidden-range-decoration',
    stickiness: 1 /* TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges */
});
