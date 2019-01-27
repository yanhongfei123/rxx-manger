<template>
	<view class="content">
		<view class="reg-label"></view>
		<view class="input-group">
			<view class="input-row  space-between">
				<text class="title">姓名</text>
				<input @input="inputChange" type="text" placeholder-class="placeholder" v-model="form.NAME" placeholder="请输入姓名" />
			</view>
			<view class="input-row  space-between">
				<text class="title">手机号</text>
				<input @input="inputChange" type="text" placeholder-class="placeholder" v-model="form.PHONE" placeholder="请输入手机号码" />
			</view>
			<view v-show="!token" class="input-row  space-between">
				<text class="title">设置密码</text>
				<input @input="inputChange" type="password" placeholder-class="placeholder" v-model="form.PASSWORD" placeholder="请输入密码" />
			</view>

			<view class="input-row  space-between">
				<text class="title">年龄</text>
				<input @input="inputChange" type="text" placeholder-class="placeholder" v-model="form.AGE" placeholder="请输入年龄" />
			</view>

			<view class="input-row  space-between">
				<text class="title">职位</text>
				<input @input="inputChange" type="text" placeholder-class="placeholder" v-model="form.POST" placeholder="请输入职业" />
			</view>

			<view class="input-row  space-between">
				<text class="title">公司名称</text>
				<input @input="inputChange" type="text" placeholder-class="placeholder" v-model="form.COMPANY_NAME" placeholder="请输入公司名称" />
			</view>

			<view class="input-row  space-between">
				<text class="title">性别</text>
				<picker class="picker-item" mode="selector" :range="sexList" range-key="sex" @change="sexChange">
					<view class="picker-btn">{{ sexList[form.SEX].sex }}</view>
				</picker>
				<view class="icon-right"></view>
			</view>

			<view @tap="isshowbox=!isshowbox" class="input-row  space-between">
				<text class="title">业务类型</text>
				<!-- <picker class="picker-item" mode="multiSelector" :range="businessTypeList" range-key="text" @change="pickerBusinessType">
					<view class="picker-btn">{{ businessTypeList[form.business_type_id - 1].text }}</view>
				</picker> -->
				<view class="icon-right"></view>
			</view>

			<view v-show="isshowbox" class="box-list  flex">
				<view class="box-label">业务类型:</view>
				<view class="box-cont">
					<!-- <view @tap="chooseType(item)" v-for="(item, index) in  businessTypeList" :key="index" class="flex box-item">
						<view :class="{checked:item.isChecked}" class="select-btn">
							<image src="/static/img/img/choosed.png" mode="widthFix"></image>
						</view>
						<view>{{item.name}}</view>
					</view> -->
					
					 <view class="checkbox-list">
						<checkbox-group @change="checkboxChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in businessTypeList" :key="item.ID">								
								<view><checkbox :value="item.ID" :checked="item.isChecked" /> {{item.name}}</view>
							</label>
						</checkbox-group>
					</view>
			
				</view>
			</view>
			<view class="input-row  space-between">
				<text class="title">身份证号码</text>
				<input maxlength="20" @input="inputChange" placeholder-class="placeholder" type="text" clearable v-model="form.ID_CARD_NO"
				 placeholder="请输入身份证号码" />
			</view>

			<view class="input-row  space-between">
				<text class="title">身份证有效期</text>
				<input @input="inputChange" type="text" placeholder-class="placeholder" v-model="form.VALIDITY" placeholder="请输入身份证有效期" />
			</view>

			<view class="input-row  space-between" @tap="goDetail('userInfo/idCard')">
				<text class="title">身份证</text>
				<!-- <image v-show="isIdCardUploaded" :src="ID_PHOTO" class="idcard idcard1" mode="aspectFit"></image>
				 <image v-show="isIdCardUploaded" :src="ID_PHOTO_Negative" class="idcard idcard2" mode="aspectFit"></image> -->

				<view v-show="isIdCardUploaded" class="idcard-des des">已上传</view>
				<view v-show="!isIdCardUploaded" class="idcard-des des">未上传</view>
				<view class="icon-right"></view>
			</view>

			<view class="input-row  space-between" @tap="goDetail('userInfo/workCard')">
				<text class="title">工作证</text>
				<!-- <image v-show="isWordCardUploaded"  :src="WORK_PERMIT" class="workcard" mode="aspectFit"></image> -->

				<view v-show="isWordCardUploaded" class="workcard-des des">已上传</view>
				<view v-show="!isWordCardUploaded" class="workcard-des des">未上传</view>
				<view class="icon-right"></view>
			</view>
			<!-- 			<view class="input-row  space-between" @tap="goDetail('userInfo/businessCard')">
				<text class="title">名片</text>
				<view class="icon-right"></view>
			</view> -->


		</view>
		<view class="btn-row">
			<button type="primary" @tap="save">保存</button>
		</view>

	</view>
</template>

<script>
	import uniInput from '../../../components/uni-input.vue';
	//import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import {
		mapState,
		mapActions
	} from "vuex";

	export default {
		components: {
			uniInput,
			//mpvuePicker
		},
		computed: {
			...mapState(["token"])
		},
		data() {
			return {
				businessTypeList: [],
				sexList: [{
					sex: '男'
				}, {
					sex: '女'
				}],
				form: {
					PHONE: '',
					NAME: '',
					business_type_id: [],
					PASSWORD: '',
					AGE: '',
					SEX: 0,
					ID_CARD_NO: '',
					VALIDITY: '',
					POST: '',
					COMPANY_NAME: ''
				},
				ID_PHOTO: '',
				ID_PHOTO_Negative: '',
				WORK_PERMIT: '',
				isIdCardUploaded: false,
				isWordCardUploaded: false,
				isshowbox: false,
				typeId: [],
				items: [{
                    value: 'USA',
                    name: '美国'
                },
                {
                    value: 'CHN',
                    name: '中国',
                    checked: 'true'
                },
                {
                    value: 'BRA',
                    name: '巴西'
                },
                {
                    value: 'JPN',
                    name: '日本'
                },
                {
                    value: 'ENG',
                    name: '英国'
                },
                {
                    value: 'FRA',
                    name: '法国'
                }
            ]
			}
		},
		methods: {
			inputChange() {
				//!this.token && uni.setStorageSync('form', JSON.stringify(this.form));
			},
			checkboxChange: function (e) {
				var values = e.detail.value;
				console.log(e.detail.value);
				this.form.business_type_id = values;
				
			},
			chooseType(item) {
				if (!item.isChecked) {
					!this.form.business_type_id.includes(item.ID) && this.form.business_type_id.push(item.ID)
				} else {
					var index = this.form.business_type_id.indexOf(item.ID);
					this.form.business_type_id.splice(index, 1);
				}

				item.isChecked = !item.isChecked;

			},
			pickerBusinessType(evt) {
				var id = parseInt(evt.detail.value);
				this.form = { ...this.form,
					business_type_id: id + 1
				};

			},
			sexChange(evt) {
				var id = parseInt(evt.detail.value);
				//this.form.SEX = id;
				this.$set(this.form, 'SEX', id);
			},
			goDetail(path) {
				uni.navigateTo({
					url: `/pages/user/${path}`
				})
			},
			removeStorage() {
				uni.removeStorageSync('form');
				uni.removeStorageSync('phone');
				uni.removeStorageSync('smscode');
				uni.removeStorageSync('workCard');
				uni.removeStorageSync('businessCard');
				uni.removeStorageSync('idcardFront');
				uni.removeStorageSync('idcardBack');
			},
			save() {
				if (this.token) {
					//this.form.business_type_id = this.form.business_type_id.toString();
					var params = {
						...this.form,
						business_type_id: this.form.business_type_id.toString(),
						WORK_PERMIT: this.workCard,
						ID_PHOTO: this.idcardFront,
						ID_PHOTO_Negative: this.idcardBack,
						PromotionCode: this.PromotionCode
					};
					if (this.form.business_type_id.length == 0) {
						this.Util.Toast.success("请选择业务类型");
						return
					}

					this.API.updateManager(params).then(res => {
						this.Util.Toast.success("保存成功");
						this.removeStorage();
						uni.setStorageSync('business_type_id', JSON.stringify(this.form.business_type_id));
						uni.setStorageSync('userInfo', JSON.stringify(res.data));
						setTimeout(() => {
							uni.switchTab({
								url: `/pages/user/user`
							});
						}, 500)
					});
					return
				}
				var params = {
					...this.form,
					business_type_id: this.form.business_type_id.toString(),
					smscode: this.smscode,
					//AVATAR: this.logoSrc,
					WORK_PERMIT: this.workCard,
					ID_PHOTO: this.idcardFront,
					ID_PHOTO_Negative: this.idcardBack,
					PromotionCode: this.PromotionCode
				};
				if (!this.form.PASSWORD) {
					this.Util.Toast.success("请设置密码");
					return
				}

				if (this.form.business_type_id.length == 0) {
					this.Util.Toast.success("请选择业务类型");
					return
				}

				this.API.registerManager(params).then(res => {
					this.Util.Toast.success("注册成功");
					this.removeStorage();
					uni.setStorageSync('userInfo', JSON.stringify(res.data));
					uni.setStorageSync('business_type_id', JSON.stringify(this.form.business_type_id));
					setTimeout(() => {
						uni.navigateTo({
							url: `/pages/login/login`
						});
					}, 1000)
				}).catch(res => {
					if (res.message == '验证码错误') {
						setTimeout(() => {
							uni.navigateTo({
								url: `/pages/reg/reg`
							});
						}, 1000)
					}
				})
			},
			setTypeLight() { // 之前选过的业务，进入页面默认选中
				var typeid = uni.getStorageSync('business_type_id');
				if (typeid) {
					var typelist = JSON.parse(typeid);
					this.$set(this.form, 'business_type_id', typelist);
					var list = [];
					typelist.map((id, index) => {
						list = this.businessTypeList.map((val, i) => {
							if (val.ID == id) {
								val.isChecked = true;
								//return val;
							}
							return val
						})
					});
					this.businessTypeList = list;
					//console.log(this.businessTypeList)
				}
			}
		},
		onLoad(option) {
			console.log('111111')
			let {
				PromotionCode
			} = option;
			this.phone = uni.getStorageSync('phone');
			this.$set(this.form, 'PHONE', this.phone);

			this.smscode = uni.getStorageSync('smscode');
			//this.logoSrc = uni.getStorageSync('logoSrc');
			this.PromotionCode = PromotionCode || '';


			//业务类型

			this.API.gettypelist().then(res => {
				this.businessTypeList = res.data.map((item, index) => {
					item.isChecked = false;
					return item
				});

				this.setTypeLight();

			});
		},
		onShow() {

			// 登陆后个人信息存在本地的userInfo
			if (this.token) {
				var userInfo = JSON.parse(uni.getStorageSync('userInfo'));
				var newUserInfo = { ...userInfo.manger,
					...userInfo.user,
					PASSWORD: '',
					business_type_id: []
				};
				var form = {};
				for (var key in this.form) {
					form[key] = newUserInfo[key];
				}
				this.form = form;
				//this.$set('')

				this.isWordCardUploaded = uni.getStorageSync('workCard') || newUserInfo.WORK_PERMIT;
				this.isIdCardUploaded = (uni.getStorageSync('idcardFront') && uni.getStorageSync('idcardBack')) || (!!newUserInfo.ID_PHOTO &&
					!!newUserInfo.ID_PHOTO_Negative);

				this.workCard = uni.getStorageSync('workCard') || newUserInfo.WORK_PERMIT;
				this.idcardFront = uni.getStorageSync('idcardFront') || newUserInfo.ID_PHOTO;
				this.idcardBack = uni.getStorageSync('idcardBack') || newUserInfo.ID_PHOTO_Negative;

				return
			}

			this.workCard = uni.getStorageSync('workCard');
			this.idcardFront = uni.getStorageSync('idcardFront');
			this.idcardBack = uni.getStorageSync('idcardBack');

			this.isWordCardUploaded = !!uni.getStorageSync('workCard');
			this.isIdCardUploaded = !!uni.getStorageSync('idcardFront') && !!uni.getStorageSync('idcardBack');

		}
	}
</script>

<style lang="scss">
	.checkbox-list label{
		display: inline-block;
		margin: 0 30upx 20upx 0;
	}
	.placeholder {
		color: #BBB;
		font-size: 32upx;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.box-list {
		font-size: 30upx;
		padding: 20upx 30upx;

		.box-label {
			width: 250upx;
		}

		.box-cont {
			overflow: hidden;
		}

		.box-item {
			float: left;
			width: 40%;
			margin: 0 0 20upx;
			padding: 0;
			;

		}
	}

	.select-btn {
		width: 24upx;
		height: 24upx;
		border: 2upx solid #FF9833;
		border-radius: 4upx;
		margin-right: 10upx;

		image {
			width: 24upx;
			height: 24upx;
			display: none;
		}

		&.checked {
			image {
				display: block;
			}
		}
	}

	.input-row {
		position: relative;

		.title {
			width: 200upx;
		}

		.des {
			position: absolute;
			right: 100upx;
			top: 50%;
			transform: translateY(-50%);
			color: #BBB;
			font-size: 30upx;
		}

		.idcard {
			height: 100upx;
			position: absolute;
			right: 100upx;
			top: 50%;
			transform: translateY(-50%);
		}

		.idcard2 {
			right: 120upx;
		}

		.workcard {
			height: 100upx;
			position: absolute;
			right: 100upx;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	.reg-label {
		margin: 40upx 0 0 0;
	}

	.btn-row {
		width: 690upx;
		margin: 150upx auto 50upx;
	}

	.picker-item {
		width: 100%;
		text-align: right !important;
		font-size: 34upx !important;
		color: #454545;

		.picker-btn {
			height: 116upx;
			line-height: 116upx;
			padding-right: 30upx;
		}
	}
</style>
