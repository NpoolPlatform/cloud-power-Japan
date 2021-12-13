<template>
  <div class="content">
    <div class="title">{{ $t("Invitation.Title") }}</div>

    <q-tree
      :nodes="invitationList"
      node-key="userid"
      default-expand-all
      :expanded=[userid]>
      <template v-slot:default-header="prop">
        <div>
          <div class="invitation-box">
            <div class="invitation-header">
              <div class="header-content">
                <span style="font-size: 20px; font-weight: 600">{{
                  prop.node.username
                }}</span>
                <div class="header-right">
                  <span>TIER</span>
                  <span
                    style="color: #54e280; font-weight: bold; margin-left: 5px"
                    >{{ prop.node.label }}</span
                  >
                </div>
              </div>
            </div>

            <div class="invitation-content">
              <span>{{ prop.node.email }}</span>
            </div>
          </div>
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { api } from "src/boot/axios";

const q = useQuasar();
const userid = q.cookies.get("UserID");

onMounted(() => {
  if (userid === "" || userid === null || userid === undefined) {
    var $router = useRouter();
    $router.push("/login");
  }
  getInvitationList();
});

const $store = useStore();

const invitationList = ref([]);

const user = computed({
  get: () => $store.state.user.user.info.UserBasicInfo,
});

const invitationParam = {
  username: "",
  userid: "",
  email: "",
  label: "",
  children: [],
};

const getInvitationList = () => {
  var appid = q.cookies.get("AppID");

  var self = this;
  api
    .post("/cloud-hashing-apis/v1/get/my/direct/invitations", {
      AppID: appid,
      InviterID: userid,
    })
    .then((resp) => {
      var father = {
        username: "",
        userid: "",
        email: "",
        label: "",
        children: [],
      };
      father.email = user.value.EmailAddress;
      father.username = user.value.Username;
      father.userid = userid;
      
      var lists = resp.data.Infos[userid]["Invitees"];
      father.label = "01(" + lists.length + ")";
      var index = 1;

      lists.forEach((list) => {
        if (list.UserID === userid) {
          return
        }

        var childrenInvitation = {
          username: "",
          userid: "",
          email: "",
          label: "",
          children: [],
        };
        childrenInvitation.email = list.EmailAddress;
        childrenInvitation.username = list.Username;
        childrenInvitation.userid = list.UserID;
        childrenInvitation.label = "02/" + index;
        father.children.push(childrenInvitation);
        index += 1;
      });

      invitationList.value.push(father);
    });
};
</script>

<style scoped>
.content {
  margin: 0 72px;
  padding: 0 24px;
}
.invitation-box {
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.2) 0,
    rgba(161, 208, 208, 0.2) 100%
  );
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 24px;
  margin: 24px;
  position: relative;
  width: 400px;
  height: auto;
}

.invitation-header::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #e1eeef 10%,
    transparent 30%
  );
  display: block;
  content: "";
  position: absolute;
  top: 55px;
  height: 1px;
  width: 1200px;
}

.header-content {
  display: flex;
  justify-content: space-between;
}

.header-right {
  display: flex;
  font-size: 20px;
}

.title {
  margin-top: 12px;
  width: 100%;
  background: linear-gradient(to left, #54e280 0, #1ec498 50%);
  background-clip: border-box;
  filter: contrast(2);
  font-size: 28px;
  font-weight: 400;
  margin: 36px auto;
  padding: 0 0 8px 0;
  position: relative;
  text-transform: uppercase;
  -webkit-background-clip: text;
  -webkit-box-decoration-break: clone;
  -webkit-text-fill-color: transparent;
}

.title::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #e1eeef 10%,
    transparent 30%
  );
  display: block;
  content: "";
  position: absolute;
  left: -16px;
  bottom: -4px;
  height: 1px;
  width: 100%;
}

.invitation-content {
  margin-top: 10px;
}
</style>
