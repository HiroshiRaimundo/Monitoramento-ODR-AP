
/**
 * Utility functions for text formatting in the rich text editor
 */

/**
 * Formats text based on the selected format option
 * 
 * @param format The format to apply
 * @param content The current content
 * @returns The formatted content
 */
export const formatText = (format: string, content: string): string => {
  switch (format) {
    case 'bold':
      return content + '<strong>texto em negrito</strong>';
    case 'italic':
      return content + '<em>texto em itálico</em>';
    case 'link':
      return content + '<a href="URL">link</a>';
    case 'list':
      return content + '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>';
    case 'orderedList':
      return content + '<ol>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ol>';
    case 'alignLeft':
      return content + '<div style="text-align: left;">texto alinhado à esquerda</div>';
    case 'alignCenter':
      return content + '<div style="text-align: center;">texto centralizado</div>';
    case 'alignRight':
      return content + '<div style="text-align: right;">texto alinhado à direita</div>';
    default:
      return content;
  }
};
