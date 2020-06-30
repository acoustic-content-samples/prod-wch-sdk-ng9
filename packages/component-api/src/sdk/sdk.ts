
export interface Sdk {
    router: {
        navigateByPath: (aPath: string) => PromiseLike<boolean>
    }
}