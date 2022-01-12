export default {
  data() {
    return {
      serviceLoadingState: {
        default: false
      },

      serviceErrors: null
    }
  },

  computed: {
    serviceErrorsComponent() {
      if (!this.serviceErrors) return null
      const { error } = this.serviceErrors

      const createErrorWrapper = (h, children = []) => h("div", { class: "h-capitalize-first-letter" }, children)

      const createErrorSpan = (h, error) => h("span", [error])

      const createErrorList = (h, errors = []) =>
        errors.length > 0
          ? h(
            "ul",
            {
              class: "h-marked-list h-marked-list--small h-marked-list--red",
              style: { paddingLeft: 0 }
            },
            errors.map(({ error }) => h("li", [createErrorSpan(h, error)]))
          )
          : null

      if (typeof error === "object")
        return {
          name: "ServiceErrors",
          render: h => {
            // errors coming from the server are formatted properly
            if (error.type === "server")
              return createErrorWrapper(h, [
                createErrorSpan(h, error.message + (error.errors ? ":" : "")),
                createErrorList(h, error.errors)
              ])

            // cast the error to string
            return createErrorWrapper(h, [createErrorSpan(h, error.toString())])
          }
        }

      return {
        name: "ServiceErrors",
        render: h => createErrorWrapper(h, [createErrorSpan(h, error)])
      }
    },

    serviceErrorToast() {
      if (!this.serviceErrors) return null
      const { error } = this.serviceErrors

      if (typeof error === "object")
        return error.type === "server"
          ? {
            title: error.errors ? error.message : "Error",
            text: error.errors ? error.errors[0].error : error.message
          }
          : { text: error.toString() }

      return { text: error }
    },

    serviceLoading() {
      return this.serviceLoadingState.default
    }
  },

  methods: {
    isServiceLoading(state) {
      return this.serviceLoadingState[state.toLowerCase()] ?? false
    },

    async dispatch(action, ...args) {
      const toggleLoading = (state, value) => {
        this.$set(this.serviceLoadingState, state, value)
      }

      const { method, state } =
        typeof action === "function"
          ? { method: action, state: "default" }
          : { method: action.action, state: action.state }

      try {
        toggleLoading(state, true)
        this.updateServiceErrors()
        // TODO: remove
        // await new Promise(resolve => setTimeout(resolve, 2000))
        return Promise.resolve(await this.fetch(method, ...args))
      } catch (error) {
        this.updateServiceErrors(error)
        return Promise.reject(error)
      } finally {
        toggleLoading(state, false)
      }
    },

    async fetch(method, ...args) {
      try {
        const response = await method.apply(this, args)
        return Promise.resolve(response)
      } catch (error) {
        return Promise.reject(this._formatError(error))
      }
    },

    updateServiceErrors(error = null) {
      if (!error) return (this.serviceErrors = null)
      this.serviceErrors = this._formatError(error)
    },

    _formatError(error) {
      if (error && error.response) {
        const { data, status } = error.response
        if (status === 404) return { error: "Error 404: " + data.message ?? "Requested resource not found", status }
        if (status === 500) return { error: "Error 500: " + data.message ?? "Internal Server Error", status }

        return {
          error: {
            type: "server",
            message: data.message || data,
            ...("errors" in data && {
              errors: Object.keys(data.errors).map(key => ({
                type: key,
                error: data.errors[key][0]
              }))
            })
          },
          status
        }
      }

      return error
    }
  }
}
