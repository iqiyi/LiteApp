/* @flow */

import * as qiyiApi from './_app/thread/index';
import { ctx } from './util/index';

ctx.__api__ = ctx.qiyiApi = qiyiApi;
export default qiyiApi;


