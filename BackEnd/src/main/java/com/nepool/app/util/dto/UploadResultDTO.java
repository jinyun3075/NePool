package com.nepool.app.util.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class UploadResultDTO implements Serializable {
    private String fileName;
    private String uuid;
    private String folderPath;
    private String imageUrl;

//    public String getImageURL(){
//        try{
//            return URLEncoder.encode(folderPath+"/"+uuid+"_"+fileName,"UTF-8");
//        } catch(UnsupportedEncodingException e){
//            e.printStackTrace();
//        }
//        return "";
//    }

}
