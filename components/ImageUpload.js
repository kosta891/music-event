import { useState } from 'react/cjs/react.development';
import { API_URL } from '../config';
import styles from '@/styles/Form.module.css';
import { toast } from 'react-toastify';

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refId', evtId);
    formData.append('field', 'image');

    toast('Your image is uploading');

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    } else {
      toast.warn('Please add image');
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  );
}
