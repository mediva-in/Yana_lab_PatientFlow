/* tslint:disable */
/* eslint-disable */
/**
 * Mediva API
 * Specification of the Mediva API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: admin@mediva.in
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';

export interface DownloadFilesRequest {
    requestBody: Array<string>;
}

export interface UploadFilesRequest {
    files: Array<Blob>;
}

/**
 * FileManagementApi - interface
 * 
 * @export
 * @interface FileManagementApiInterface
 */
export interface FileManagementApiInterface {
    /**
     * 
     * @summary Download multiple files from S3
     * @param {Array<string>} requestBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FileManagementApiInterface
     */
    downloadFilesRaw(requestParameters: DownloadFilesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<string>>>;

    /**
     * Download multiple files from S3
     */
    downloadFiles(requestBody: Array<string>, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<string>>;

    /**
     * 
     * @summary Upload multiple files to S3
     * @param {Array<Blob>} files 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FileManagementApiInterface
     */
    uploadFilesRaw(requestParameters: UploadFilesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<string>>>;

    /**
     * Upload multiple files to S3
     */
    uploadFiles(files: Array<Blob>, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<string>>;

}

/**
 * 
 */
export class FileManagementApi extends runtime.BaseAPI implements FileManagementApiInterface {

    /**
     * Download multiple files from S3
     */
    async downloadFilesRaw(requestParameters: DownloadFilesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<string>>> {
        if (requestParameters['requestBody'] == null) {
            throw new runtime.RequiredError(
                'requestBody',
                'Required parameter "requestBody" was null or undefined when calling downloadFiles().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("http-bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/api/terminal/download-files`;

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['requestBody'],
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Download multiple files from S3
     */
    async downloadFiles(requestBody: Array<string>, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<string>> {
        const response = await this.downloadFilesRaw({ requestBody: requestBody }, initOverrides);
        return await response.value();
    }

    /**
     * Upload multiple files to S3
     */
    async uploadFilesRaw(requestParameters: UploadFilesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<string>>> {
        if (requestParameters['files'] == null) {
            throw new runtime.RequiredError(
                'files',
                'Required parameter "files" was null or undefined when calling uploadFiles().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("http-bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters['files'] != null) {
            requestParameters['files'].forEach((element) => {
                formParams.append('files', element as any);
            })
        }


        let urlPath = `/api/terminal/upload-files`;

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Upload multiple files to S3
     */
    async uploadFiles(files: Array<Blob>, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<string>> {
        const response = await this.uploadFilesRaw({ files: files }, initOverrides);
        return await response.value();
    }

}
