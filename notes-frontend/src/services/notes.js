import axios from 'axios'

const baseurl = `/api/notes`

const getAll = () => {
    const request= axios.get(baseurl)
    return request.then(response => response.data)

}

// checking for toggleImportance error message working

// const getAll = () => {
//     const request = axios.get(baseurl)
//     const nonExisting = {
//       id: 10000,
//       content: 'This note is not saved to server',
//       date: '2019-05-30T17:30:31.098Z',
//       important: true,
//     }
//     return request.then(response => response.data.concat(nonExisting))
//   }

const create = (newObject) => {
    const request= axios.post(baseurl,newObject)
    return request.then(response => response.data)
}

const update = (id,newObject) => {
    const request= axios.put(`${baseurl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }