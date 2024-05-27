// import React, {useState, useEffect} from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import './SectionAdd.css'

// const SectionAdd = () => {
//   const { sectionId } = useParams()
//   const [cover, setCover] = useState()
//   const [section, setSection] = useState({
//     title: '',
//     subtitle: '',
//     cover: cover,
//   })

//   const [isUpdateMode, setIsUpdateMode] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (sectionId) {
//       console.log('Section ID:', sectionId);
//       setIsUpdateMode(true);
//       fetchSectionDetails(sectionId);
//     }
//   }, [sectionId]);

//   const fetchSectionDetails = async (id) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/section/${id}/`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched section data:', data);
//         setSection({
//           title: data.title,
//           subtitle: data.subtitle,
//           cover: data.cover,
//         });
//       } else {
//         console.error('Failed to fetch section details.');
//       }
//     } catch (error) {
//       console.error('Error fetching section details:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     console.log(`Input Change - ${name}: ${value}`); 
//     setSection({ ...section, [name]: value });
// };

//   const createSection = async () => {
//     try {
//         const formData = new FormData();
//         formData.append('title', section.title);
//         formData.append('subtitle', section.subtitle);
//         if (cover) {
//             formData.append('cover', cover);
//         } else {
//             formData.append('cover', '');
//         }
        
//         const url = `http://127.0.0.1:8000/api/section/`
//         const response = await fetch(url, {
//           method: 'POST',
//           body: formData,
//       });

//       if (!response.ok) {
//         console.error('Error creating section. Server responded with:', response.status, response.statusText);
//         alert("Error creating section")
//         return;
//     }
//     navigate('/learning')
        
//     } catch (error) {
//       console.error('Error creating section:', error);
//       alert('Error creating section:', error)
//     }
//   }

//   const updateSection = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('title', section.title);
//       formData.append('subtitle', section.subtitle);
//       if (cover) {
//         formData.append('cover', cover);
//       }

//       const url = `http://127.0.0.1:8000/api/section/${sectionId}/edit/`;
//       const response = await fetch(url, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (!response.ok) {
//         console.error('Error updating section. Server responded with:', response.status, response.statusText);
//         alert("Error updating section");
//         return;
//       }
//       navigate('/learning');
//     } catch (error) {
//       console.error('Error updating section:', error);
//       alert('Error updating section:', error);
//     }
//   };

//   let handleSubmit = ()=> {   
//     if (section.title.trim() !== '' && section.subtitle.trim() !== '') {
//       if (isUpdateMode) {
//         updateSection();
//       } else {
//         createSection();
//       }
//     } else {
//       alert("Section contents cannot be empty");
//     }   
//   }

//   const [inputKey, setInputKey] = useState(Date.now()); 

//   const clearImage = () => {
//     setInputKey(Date.now());
//   }

//   return (
//     <div className='section-add-container'>
//       {sectionId ? 
//         <h1>Add Section</h1>:
//         <h1>{section.title}</h1>
//       }
//         <div className="section-form">
//           <div className="horizontal-container cover-container">
//             <p>Cover</p>
//             <input 
//                 className='section-cover-input'
//                 type='file' 
//                 accept='image/*' 
//                 key={inputKey} 
//                 value={undefined} 
//                 onChange={(e)=> setCover(e.target.files[0])}
//             />

//             <button
//               className='clear-img-btn' 
//               onClick={clearImage}>
//                 Clear
//               </button>
//           </div>

//           <input
//               className='section-title-input'
//               type='text'
//               name='title'
//               placeholder='Title...'
//               value={section.title}
//               onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'title' } })}
//           />
//           <input
//               className='section-subtitle-input'
//               type='text'
//               name='subtitle'
//               placeholder='Subitle...'
//               value={section.subtitle}
//               onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'subtitle' } })}
//           />

//           <button 
//             className='section-add-btn'
//             onClick={handleSubmit}>
//             {isUpdateMode ? 'Update' : 'Done'}
//         </button>
//         </div>
//     </div>
//   )
// }

// export default SectionAdd

import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './SectionAdd.css'

const SectionAdd = () => {
  const [cover, setCover] = useState()
  const [section, setSection] = useState({
    title: '',
    subtitle: '',
    cover: cover,
  })

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSection({ ...section, [name]: value });
};

  const createSection = async () => {
    try {
        const formData = new FormData();
        formData.append('title', section.title);
        formData.append('subtitle', section.subtitle);
        if (cover) {
            formData.append('cover', cover);
        } else {
            formData.append('cover', '');
        }
        
        const url = `http://127.0.0.1:8000/api/section/`
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
      });

      if (!response.ok) {
        console.error('Error creating section. Server responded with:', response.status, response.statusText);
        alert("Error creating section")
        return;
    }
    navigate('/learning')
        
    } catch (error) {
      console.error('Error creating section:', error);
      alert('Error creating section:', error)
    }
  }

  let handleSubmit = ()=> {
    if (section.title.trim() !== '' &&
        section.subtitle.trim() !== '') {
        createSection();
    } else {
        alert("Section contents cannot be empty")
    }        
  }

  const [inputKey, setInputKey] = useState(Date.now()); 

  const clearImage = () => {
    setInputKey(Date.now());
  }

  return (
    <div className='section-add-container'>
        <h1>Add Section</h1>
        <div className="section-form">
          <div className="horizontal-container cover-container">
            <p>Cover</p>
            <input 
                className='section-cover-input'
                type='file' 
                accept='image/*' 
                key={inputKey} 
                value={undefined} 
                onChange={(e)=> setCover(e.target.files[0])}
            />

            <button
              className='clear-img-btn' 
              onClick={clearImage}
              >Clear</button>
          </div>

          <input
              className='section-title-input'
              type='text'
              name='title'
              placeholder='Title...'
              value={section.title}
              onChange={handleInputChange}
          />
          <input
              className='section-subtitle-input'
              type='text'
              name='subtitle'
              placeholder='Subitle...'
              value={section.subtitle}
              onChange={handleInputChange}
          />

          <button 
            className='section-add-btn'
            onClick={handleSubmit}>
              Done
            </button>
        </div>
    </div>
  )
}

export default SectionAdd