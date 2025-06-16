import pool from '../../lib/db';

export default async function handler(req, res) {
  //1) selecting all properties
  const [props] = await pool.query('SELECT * FROM properties');
  //2) selecting all images in one go
  const [imgs]  = await pool.query('SELECT property_id, file_name FROM property_images');

  //grouping images by property_id
  const imagesByProp = imgs.reduce((acc, img) => {
    acc[img.property_id] = acc[img.property_id] || [];
    acc[img.property_id].push(`/images/${img.file_name}`);
    return acc;
  }, {});

  //attach to each property
  const data = props.map(p => ({
    ...p,
    images: imagesByProp[p.id] || []
  }));

  res.status(200).json(data);
}
