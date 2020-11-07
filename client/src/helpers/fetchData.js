export const getData = async (url = "", token = "") => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export const postData = async (url = "", data, token = "") => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    const json = await response.json()
    console.log("Status:", response.status, JSON.stringify(json))
    return { data: json, status: response.status }
  } catch (error) {
    console.error("Ошибка:", error)
  }
}

export const patchData = async (url = "", data, token = "") => {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })

    const json = await response.json()
    console.log("Status:", response.status, JSON.stringify(json))
    return json
  } catch (error) {
    console.error("Ошибка:", error)
  }
}

export const deleteData = async (url = "", token = "") => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })

    const json = await response.json()
    console.log("Status:", response.status, JSON.stringify(json))
    return json
  } catch (error) {
    console.error("Ошибка:", error)
  }
}
