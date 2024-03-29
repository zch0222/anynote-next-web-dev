export interface HuaweiOBSTemporarySignature {
    signedUrl: string;
    actualSignedRequestHeaders: { [key: string]: string };
    uploadId: string
}

export interface ImageUploadTempLinkDTO {
    /**
     * 文件名称
     */
    fileName: string;

    /**
     * 图片类型
     */
    contentType: string;

    /**
     * 上传ID
     */
    uploadId: string;
}
