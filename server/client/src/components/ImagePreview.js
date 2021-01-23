import React, { useState, useEffect } from "react";

function ImagePreview() {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //       file: null
    //     }
    //     this.handleChange = this.handleChange.bind(this)
    //   }
    //   handleChange(event) {
    //     this.setState({
    //       file: URL.createObjectURL(event.target.files[0])
    //     })
    //   }

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined)
          return
      }

      setSelectedFile(e.target.files[0])
  }


      
        return (
            <div className="form-group text-left below-navbar " style={{color:"white"}}>
            <label>Upload Image: </label>
            <input type="file" onChange={onSelectFile}/>
            <div>
             { selectedFile && <img src={preview} style={{height:50 , width:50 , marginTop:40}}/> }
            </div>
            
          </div>
        );
      
}

export default ImagePreview;