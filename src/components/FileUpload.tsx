import React, { useRef, useLayoutEffect } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"

import { RootState } from "../redux/store"
import { useAppDispatch } from "../redux/hooks"
import { uploadFile } from "../redux/reducers/fileReducer"

export const FileUpload = (props: any) => {
  const dispatch = useAppDispatch()
  const file = useSelector((state: RootState) => state.fileRedu)
  
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0]
    dispatch(uploadFile(fileUploaded))
    setTimeout(()=>{props.handleFile(file.location)},3000)
  }

  return (
    <>
      <input
        onChange={handleChange}
        type="file"
        className="fileupload"
      />
    </>
  )
}
