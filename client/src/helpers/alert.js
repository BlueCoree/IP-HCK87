import Swal from 'sweetalert2'

export function showError(error) {
    let message = 'Opps, something went wrong!'
    if (error instanceof Error) {
        message = error.message
    }
    if (error.response) {
        message = error.response.data.message
    }
    Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: message,
    })
}

export function showSuccess(message) {
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Done',
        timer: 2000
    })
}