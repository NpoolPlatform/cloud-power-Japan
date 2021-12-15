export default function () {
  return {
    user: {
      info: {
        UserBasicInfo: {
          UserID: "",
          Username: "",
          Password: "",
          Avatar: "",
          Age: 0,
          Gender: "",
          Region: "",
          Birthday: "",
          Country: "",
          Province: "",
          City: "",
          PhoneNumber: "",
          Compony: "",
          EmailAddress: "",
          SignupMethod: "",
          Career: "",
          DisplayName: "",
          FirstName: "",
          LastName: "",
          StreetAddress1: "",
          StreetAddress2: "",
          PostalCode: "",
        },
        UserAppInfo: {
          UserApplicationInfo: {
            ID: "",
            AppID: "",
            UserID: "",
            Original: true,
            KycVerify: false,
            GAVerify: false,
            GALogin: false,
            LoginNumber: 0,
            CreateAT: 0,
          },
          UserGroupInfos: [
            {
              ID: "",
              GroupID: "",
              AppID: "",
              UserID: "",
              Annotation: "",
              CreateAT: 0,
            },
          ],
          UserRoleInfo: {
            Infos: [
              {
                ID: "",
                AppID: "",
                RoleName: "",
                Creator: "",
                CreateAT: 0,
                UpdateAT: 0,
                Annotation: "",
              },
            ],
            UserID: "",
            AppID: "",
          },
        },
      },
      logined: false,
    },
  };
}
