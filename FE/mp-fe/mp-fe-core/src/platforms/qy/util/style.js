/* @flow */

import { cached, extend, toObject , makeMap } from 'shared/util'

export const isHtmlStyle = makeMap('alignContent,alignItems,alignSelf,alignmentBaseline,all,animation,animationDelay,animationDirection,animationDuration,animationFillMode,animationIterationCount,animationName,animationPlayState,animationTimingFunction,backfaceVisibility,background,backgroundAttachment,backgroundBlendMode,backgroundClip,backgroundColor,backgroundImage,backgroundOrigin,backgroundPosition,backgroundPositionX,backgroundPositionY,backgroundRepeat,backgroundRepeatX,backgroundRepeatY,backgroundSize,baselineShift,blockSize,border,borderBottom,borderBottomColor,borderBottomLeftRadius,borderBottomRightRadius,borderBottomStyle,borderBottomWidth,borderCollapse,borderColor,borderImage,borderImageOutset,borderImageRepeat,borderImageSlice,borderImageSource,borderImageWidth,borderLeft,borderLeftColor,borderLeftStyle,borderLeftWidth,borderRadius,borderRight,borderRightColor,borderRightStyle,borderRightWidth,borderSpacing,borderStyle,borderTop,borderTopColor,borderTopLeftRadius,borderTopRightRadius,borderTopStyle,borderTopWidth,borderWidth,bottom,boxShadow,boxSizing,breakAfter,breakBefore,breakInside,bufferedRendering,captionSide,caretColor,clear,clip,clipPath,clipRule,color,colorInterpolation,colorInterpolationFilters,colorRendering,columnCount,columnFill,columnGap,columnRule,columnRuleColor,columnRuleStyle,columnRuleWidth,columnSpan,columnWidth,columns,contain,content,counterIncrement,counterReset,cursor,cx,cy,d,direction,display,dominantBaseline,emptyCells,fill,fillOpacity,fillRule,filter,flex,flexBasis,flexDirection,flexFlow,flexGrow,flexShrink,flexWrap,float,floodColor,floodOpacity,font,fontDisplay,fontFamily,fontFeatureSettings,fontKerning,fontSize,fontStretch,fontStyle,fontVariant,fontVariantCaps,fontVariantLigatures,fontVariantNumeric,fontWeight,grid,gridArea,gridAutoColumns,gridAutoFlow,gridAutoRows,gridColumn,gridColumnEnd,gridColumnGap,gridColumnStart,gridGap,gridRow,gridRowEnd,gridRowGap,gridRowStart,gridTemplate,gridTemplateAreas,gridTemplateColumns,gridTemplateRows,height,hyphens,imageRendering,inlineSize,isolation,justifyContent,justifyItems,justifySelf,left,letterSpacing,lightingColor,lineBreak,lineHeight,listStyle,listStyleImage,listStylePosition,listStyleType,margin,marginBottom,marginLeft,marginRight,marginTop,marker,markerEnd,markerMid,markerStart,mask,maskType,maxBlockSize,maxHeight,maxInlineSize,maxWidth,maxZoom,minBlockSize,minHeight,minInlineSize,minWidth,minZoom,mixBlendMode,objectFit,objectPosition,offset,offsetDistance,offsetPath,offsetRotate,opacity,order,orientation,orphans,outline,outlineColor,outlineOffset,outlineStyle,outlineWidth,overflow,overflowAnchor,overflowWrap,overflowX,overflowY,padding,paddingBottom,paddingLeft,paddingRight,paddingTop,page,pageBreakAfter,pageBreakBefore,pageBreakInside,paintOrder,perspective,perspectiveOrigin,placeContent,placeItems,placeSelf,pointerEvents,position,quotes,r,resize,right,rx,ry,scrollBehavior,shapeImageThreshold,shapeMargin,shapeOutside,shapeRendering,size,speak,src,stopColor,stopOpacity,stroke,strokeDasharray,strokeDashoffset,strokeLinecap,strokeLinejoin,strokeMiterlimit,strokeOpacity,strokeWidth,tabSize,tableLayout,textAlign,textAlignLast,textAnchor,textCombineUpright,textDecoration,textDecorationColor,textDecorationLine,textDecorationSkip,textDecorationStyle,textIndent,textOrientation,textOverflow,textRendering,textShadow,textSizeAdjust,textTransform,textUnderlinePosition,top,touchAction,transform,transformOrigin,transformStyle,transition,transitionDelay,transitionDuration,transitionProperty,transitionTimingFunction,unicodeBidi,unicodeRange,userSelect,userZoom,vectorEffect,verticalAlign,visibility,WebkitAppRegion,WebkitAppearance,WebkitBackgroundClip,WebkitBackgroundOrigin,WebkitBorderAfter,WebkitBorderAfterColor,WebkitBorderAfterStyle,WebkitBorderAfterWidth,WebkitBorderBefore,WebkitBorderBeforeColor,WebkitBorderBeforeStyle,WebkitBorderBeforeWidth,WebkitBorderEnd,WebkitBorderEndColor,WebkitBorderEndStyle,WebkitBorderEndWidth,WebkitBorderHorizontalSpacing,WebkitBorderImage,WebkitBorderStart,WebkitBorderStartColor,WebkitBorderStartStyle,WebkitBorderStartWidth,WebkitBorderVerticalSpacing,WebkitBoxAlign,WebkitBoxDecorationBreak,WebkitBoxDirection,WebkitBoxFlex,WebkitBoxFlexGroup,WebkitBoxLines,WebkitBoxOrdinalGroup,WebkitBoxOrient,WebkitBoxPack,WebkitBoxReflect,WebkitColumnBreakAfter,WebkitColumnBreakBefore,WebkitColumnBreakInside,WebkitFontSizeDelta,WebkitFontSmoothing,WebkitHighlight,WebkitHyphenateCharacter,WebkitLineBreak,WebkitLineClamp,WebkitLocale,WebkitLogicalHeight,WebkitLogicalWidth,WebkitMarginAfter,WebkitMarginAfterCollapse,WebkitMarginBefore,WebkitMarginBeforeCollapse,WebkitMarginBottomCollapse,WebkitMarginCollapse,WebkitMarginEnd,WebkitMarginStart,WebkitMarginTopCollapse,WebkitMask,WebkitMaskBoxImage,WebkitMaskBoxImageOutset,WebkitMaskBoxImageRepeat,WebkitMaskBoxImageSlice,WebkitMaskBoxImageSource,WebkitMaskBoxImageWidth,WebkitMaskClip,WebkitMaskComposite,WebkitMaskImage,WebkitMaskOrigin,WebkitMaskPosition,WebkitMaskPositionX,WebkitMaskPositionY,WebkitMaskRepeat,WebkitMaskRepeatX,WebkitMaskRepeatY,WebkitMaskSize,WebkitMaxLogicalHeight,WebkitMaxLogicalWidth,WebkitMinLogicalHeight,WebkitMinLogicalWidth,WebkitPaddingAfter,WebkitPaddingBefore,WebkitPaddingEnd,WebkitPaddingStart,WebkitPerspectiveOriginX,WebkitPerspectiveOriginY,WebkitPrintColorAdjust,WebkitRtlOrdering,WebkitRubyPosition,WebkitTapHighlightColor,WebkitTextCombine,WebkitTextDecorationsInEffect,WebkitTextEmphasis,WebkitTextEmphasisColor,WebkitTextEmphasisPosition,WebkitTextEmphasisStyle,WebkitTextFillColor,WebkitTextOrientation,WebkitTextSecurity,WebkitTextStroke,WebkitTextStrokeColor,WebkitTextStrokeWidth,WebkitTransformOriginX,WebkitTransformOriginY,WebkitTransformOriginZ,WebkitUserDrag,WebkitUserModify,WebkitWritingMode,whiteSpace,widows,width,willChange,wordBreak,wordSpacing,wordWrap,writingMode,x,y,zIndex,zoom')

export const parseStyleText = cached(function (cssText) {
  const res = {}
  const listDelimiter = /;(?![^(]*\))/g
  const propertyDelimiter = /:(.+)/
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter)
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim())
    }
  })
  return res
})

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data: VNodeData): ?Object {
  const style = normalizeStyleBinding(data.style)
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
export function normalizeStyleBinding (bindingStyle: any): ?Object {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
export function getStyle (vnode: VNode, checkChild: boolean): Object {
  const res = {}
  let styleData

  if (checkChild) {
    let childNode = vnode
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData)
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData)
  }

  let parentNode = vnode
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData)
    }
  }
  return res
}

