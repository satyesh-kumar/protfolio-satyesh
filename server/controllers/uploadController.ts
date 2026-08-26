import { Request, Response, NextFunction } from 'express';
import { cloudinary } from '../config/cloudinary';

export async function uploadMedia(req: Request, res: Response, next: NextFunction) {
  try {
    const { imageBase64, folder = 'satyesh-portfolio' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        success: false,
        message: 'No image payload provided for Cloudinary upload',
      });
    }

    // Upload directly to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageBase64, {
      folder,
      resource_type: 'auto',
    });

    res.json({
      success: true,
      data: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        format: uploadResult.format,
        width: uploadResult.width,
        height: uploadResult.height,
      },
    });
  } catch (err: any) {
    next(err);
  }
}
