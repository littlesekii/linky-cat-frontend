import { utils } from '@/utils/utils';
import { computed, readonly, ref, watch } from 'vue';

const signupData = ref({
  email: '',
  username: '',
  password: '',
  displayName: '',
  bio: ''
});

const signupConstraints = ref({
  firstEmailVerificationSent: false,
  emailVerified: false,
  verificationTimeout: 0
});

const verificationTimeoutTimer = utils.timer(() => {
  --signupConstraints.value.verificationTimeout;
  // console.log(signupData.value.verificationTimeout);
}, 1000);

watch(() => signupConstraints.value.verificationTimeout, (newValue) => {
  if (newValue <= 0) {
    // console.log('canceled');
    verificationTimeoutTimer.cancel();
  }
});

export const useSignupData = () => {

  const email = computed(() => signupData.value.email);
  const username = computed(() => signupData.value.username);
  const password = computed(() => signupData.value.password);
  const displayName = computed(() => signupData.value.displayName);
  const bio = computed(() => signupData.value.bio);
  const firstEmailVerificationSent = computed(() => signupConstraints.value.firstEmailVerificationSent);
  const emailVerified = computed(() => signupConstraints.value.emailVerified);
  const verificationTimeout = computed(() => signupConstraints.value.verificationTimeout);

  const setEmail = (email: string) => {
    signupData.value.email = email;
  };

  const setUsername = (username: string) => {
    signupData.value.username = username;
  };

  const setPassword = (password: string) => {
    signupData.value.password = password;
  };

  const setDisplayName = (displayName: string) => {
    signupData.value.displayName = displayName;
  };

  const setBio = (bio: string) => {
    signupData.value.bio = bio;
  };

  const setFirstEmailVerificationSent = (firstEmailVerificationSent: boolean) => {
    signupConstraints.value.firstEmailVerificationSent = firstEmailVerificationSent;
  };

  const setEmailVerified = (emailVerified: boolean) => {
    signupConstraints.value.emailVerified = emailVerified;
  };

  const setVerificationTimeout = (verificationTimeout: number) => {
    signupConstraints.value.verificationTimeout = verificationTimeout;
  };

  const startVerificationTimeoutTimer = () => {
    verificationTimeoutTimer();
  };

  return {
    email: readonly(email),
    username: readonly(username),
    password: readonly(password),
    displayName: readonly(displayName),
    bio: readonly(bio),
    setEmail,
    setUsername,
    setPassword,
    setDisplayName,
    setBio,

    firstEmailVerificationSent: readonly(firstEmailVerificationSent),
    emailVerified: readonly(emailVerified),
    verificationTimeout: readonly(verificationTimeout),
    setFirstEmailVerificationSent,
    setEmailVerified,
    setVerificationTimeout,
    startVerificationTimeoutTimer
  };
};
