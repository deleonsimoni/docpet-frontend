export interface Blog {
  id?: String,
  title: String,
  link_blog: String,
  link_author: String,
  speciality: String,
  doctor_name: String,
  doctor_pic: String,
  short_description: String,
  description: String,
  img: String,
  reviews: {
    nameUser: String,
    email:String,
    comment:String,
    
  }
}
