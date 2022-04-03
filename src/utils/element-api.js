/* IFTRUE_offCDN */
 import {Message} from 'element-ui'
/* FITRUE_offCDN */

export const showMessage = options => {
  /* IFTRUE_offCDN */
  Message(options)
  /* FITRUE_offCDN */

  /* IFTRUE_cdn */
  window.ELEMENT.Message(options);
  /* IFTRUE_cdn */
}
