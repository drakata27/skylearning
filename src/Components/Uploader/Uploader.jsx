import {useState} from 'react'
import './Uploader.css'
import {MdCloudUpload, MdDelete} from 'react-icons/md'
import {AiFillFileImage} from 'react-icons/ai'

const Uploader = ({inputKey, setCover}) => {
    const [image, setimage] = useState(null)
    const [fileName, setFileName] = useState("No selected cover")

  return (
    <div className="uploader-container">
        <main>
            <form 
                onClick={()=> document.querySelector('.section-cover-input').click()}
            >
                <input 
                    className='section-cover-input'
                    type='file' 
                    accept='image/*' 
                    key={inputKey} 
                    value={undefined} 
                    // onChange={(e)=> setCover(e.target.files[0])}
                    onChange={({ target: {files}}) => {
                        files[0] && setFileName(files[0].name)
                        if (files) {
                            setimage(URL.createObjectURL(files[0]))
                        }
                        setCover(files[0])
                    }}
                    hidden
                /> 
                { image ? 
                <img src={image} alt='cover' width={150} height={150}/> 
                : 
                <>
                    <MdCloudUpload color='white' size={60}/>
                    <p style={{color: 'white'}}>Browse Files to upload</p>
                </>
                }
            </form>
            <section className='uploaded-row'>
                <AiFillFileImage color='white'/>
                <span
                    className='upload-content' 
                    style={{color: 'white'}}
                >
                    {fileName}
                </span>
                <MdDelete 
                    color='white'
                    onClick={()=>{
                        setFileName("No selected file")
                        setimage(null)
                    }}
                />
            </section>
        </main>

    </div>
  )
}

export default Uploader