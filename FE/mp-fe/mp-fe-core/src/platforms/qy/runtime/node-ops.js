/* @flow */

import { namespaceMap } from 'web/util/index'
import QNode from '../bridge/QNode';
import * as qnodeOps from '../bridge/qnode-ops';

export function createElement (tagName: string, vnode: VNode): Element {
  return new QNode(tagName,vnode);
}

export function createElementNS (namespace: string, tagName: string): Element {
  return new QNode(tagName,{ns : namespaceMap[namespace]});
}

export function createTextNode (text: string): Text {
  return new QNode('text',{text:text});
}

export function createComment (text: string): Comment {
  return new QNode('comment',{text:text});
}

export function insertBefore (parentNode: Node, newNode: Node, referenceNode: Node) {
  // set parentNode
  newNode.parentNode = parentNode;
  // note that referenceNode maybe undefined because of qnode nextSibling 
  if(referenceNode){
    referenceNode.parentNode = parentNode
    let referIndex = parentNode.children.indexOf(referenceNode);
    // add newNode to parent children
    parentNode.children.splice(referIndex, 0, newNode)
  }else{
    parentNode.children.push(newNode);
  }
  // add direct
  qnodeOps.insertBefore( parentNode , newNode , referenceNode );
}

export function removeChild (node: Node, child: Node) {
  child.parentNode = node;
  let childIndex = node.children.indexOf(child);
  node.children.splice(childIndex,1);
  qnodeOps.removeCh( child );
}

export function appendChild (node: Node, child: Node) {
  // set parentNode
  child.parentNode = node;
  node && node.children && node.children.push(child);
  // add direct
  qnodeOps.appendCh( child )
}

export function parentNode (node: Node): ?Node {
  return node.parentNode
}

export function nextSibling (node: Node): ?Node {
  if(node.parentNode){
    let index = node.parentNode.children.indexOf(node);
    if(node.parentNode.children.length > index + 1){
      return node.parentNode.children[index + 1];
    }
  }else{
    typeof console !== 'undefined' && console.error(`[node-ops] get nextSibling error`,node)
  }
}

export function tagName (node: Element): string {
  return node.tagName
}

export function setTextContent (node: Node, text: string) {
  node.text = text;
  qnodeOps.setTextContent( node , text )
}

export function setAttribute (node: Element, key: string, val: string) {
  qnodeOps.setAttr( node , key , val )
}
