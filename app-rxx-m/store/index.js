import Vue from 'vue'
import Vuex from 'vuex'
import Util from '../utils/util'
import API from '../utils/api';

Vue.use(Vuex)
Vue.prototype.API = API;
const store = new Vuex.Store({
    state: {
        userName: "",
        token: Util.getStorageSync('token'),
        avatar: Util.getStorageSync('avatar'),
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_NAME: (state, userName) => {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },

    },
    actions: {
        Login({ commit }, params) {
            return new Promise((resolve, reject) => {
                API.authLogin(params).then(res => {
					var avatar = res.data.user.AVATAR;
					commit('SET_TOKEN', res.token)
					Util.setStorageSync('token', res.token)
					if(avatar && avatar.indexOf('http') != -1){
						commit('SET_AVATAR', res.data.user.AVATAR)
						Util.setStorageSync('avatar', avatar)
					}
					resolve(res)                 
                })
            })
        },       
		LoginOut({ commit }) {
			return new Promise((resolve, reject) => {
				API.logout().then(() => {
					commit('SET_TOKEN', '')
				   // Util.setStorageSync('token', '');
				   // Util.setStorageSync('avatar', '');
				   // 清掉全部缓存
					try {
					 uni.clearStorageSync();
					} catch (e) {
					  // error
					}					
					resolve()
				})
			})
		},
        async getHomeData({ commit, state }) {
            const { data } = await API.getHomeData(state.ids[0])
            commit('CHANGE_HOME_DATA', { data })
        },
        async getMovieDetail({ commit, state }, id) {
            const { data: { data } } = await API.getMovieDetail(id)
            commit('CHANGE_CURRENT_MOVIE', { data: data[0] })
        },
        clearMovieDetail({ commit }) {
            commit('CHANGE_CURRENT_MOVIE', { data: {} })
        }
    }
})

export default store