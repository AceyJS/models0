import { Model } from 'acey'

export type TLoading = 'default' | 'refresh' | false

interface ILoadingManagerState {
    loading: TLoading
}

const DEFAULT_STATE: ILoadingManagerState = {
    loading: false
}

export default class LoadingManager extends Model {

    static DefaultState: ILoadingManagerState = DEFAULT_STATE 
    constructor(state: ILoadingManagerState = DEFAULT_STATE, options: any){
        super(state, options)
        this.setState({
            has_loaded: state.loading
        })
    }

    public hasAlreadyLoaded = (): boolean => this.state.has_loaded

    public isLoading = () => this.state.loading != false
    public isRefreshing = () => this.state.loading === 'refresh'
    public isLoadingDefault = () => this.isLoading() && !this.isRefreshing()
    public getLoadingStatus = () => this.state.loading as TLoading

    public enable = (type: 'default' | 'refresh') => this.setState({loading: type, has_loaded: true}).save()
    public disable = () => this.setState({loading: false}).save()
}

