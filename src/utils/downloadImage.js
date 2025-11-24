import { toPng, toJpeg, toBlob } from 'html-to-image';

export const downloadImage = async (element, format = 'png', scale = 2) => {
    if (!element) return;

    try {
        const config = {
            quality: 0.95,
            pixelRatio: scale,
        };

        let dataUrl;
        if (format === 'png') {
            dataUrl = await toPng(element, config);
        } else if (format === 'jpeg') {
            dataUrl = await toJpeg(element, config);
        }

        const link = document.createElement('a');
        link.download = `bannerly-export.${format}`;
        link.href = dataUrl;
        link.click();
    } catch (error) {
        console.error('Failed to export image:', error);
    }
};
