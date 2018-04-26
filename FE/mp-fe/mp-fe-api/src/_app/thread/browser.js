/* @flow */

import { baseCall } from './base';
import { addParamsToUrl , webHost } from '../../util/index';

export function share( page , data ){
  let url = addParamsToUrl( `${webHost}/123/web/src/_html/${page}.html` , data );
  baseCall( 'share' , {url} );
};
export function goBrowser( page , data ){
  let url = addParamsToUrl( `${webHost}/123/web/src/_html/${page}.html` , data );
  baseCall( 'goBrowser' , {url} );
}
