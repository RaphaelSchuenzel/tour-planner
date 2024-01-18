function errorToast(errorMessage: string) {
    return useToast().add({
        title: `An error occured: ${errorMessage}`,
        color: 'red'
    })
}

export { errorToast }