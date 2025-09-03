#!/usr/bin/env bash
set -euo pipefail
TOP="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$TOP/out"
KVER="${KVER:-6.10}"          # adjust if you want another version
BUSYVER="${BUSYVER:-1.36.1}"
JOBS="${JOBS:-$(nproc)}"

mkdir -p "$OUT" "$TOP/build/tmp"
cd "$TOP/build/tmp"

# 1) fetch kernel
if [ ! -d linux-$KVER ]; then
  wget -q "https://cdn.kernel.org/pub/linux/kernel/v6.x/linux-$KVER.tar.xz"
  tar xf linux-$KVER.tar.xz
fi

# 2) build kernel
cd linux-$KVER
if [ ! -f .config ]; then
  make x86_64_defconfig
  # Optionally copy custom config:
  if [ -f "$TOP/build/config/linux.config" ]; then
    cp "$TOP/build/config/linux.config" .config
  fi
fi
make -j"$JOBS"
cp arch/x86/boot/bzImage "$OUT/vmlinuz-$KVER"
cd ..

# 3) BusyBox
if [ ! -d busybox-$BUSYVER ]; then
  wget -q "https://busybox.net/downloads/busybox-$BUSYVER.tar.bz2"
  tar xf busybox-$BUSYVER.tar.bz2
fi
cd busybox-$BUSYVER
make defconfig
if [ -f "$TOP/build/config/busybox.config" ]; then
  cp "$TOP/build/config/busybox.config" .config
fi
# static build avoids needing a C lib in initramfs
sed -i 's/.*CONFIG_STATIC.*/CONFIG_STATIC=y/' .config || true
make -j"$JOBS"
make CONFIG_PREFIX="$PWD/_install" install
cd ..

# 4) make initramfs
ROOT="$OUT/initramfs-root"
rm -rf "$ROOT"
mkdir -p "$ROOT"/{bin,sbin,etc,proc,sys,dev,usr/bin,usr/sbin}
cp -a busybox-$BUSYVER/_install/* "$ROOT/"
cat > "$ROOT/init" <<'EOF'
#!/bin/sh
mount -t proc none /proc
mount -t sysfs none /sys
echo "Welcome to MyOS"
exec /bin/sh
EOF
chmod +x "$ROOT/init"
# device nodes
sudo mknod -m 622 "$ROOT/dev/console" c 5 1 || true
sudo mknod -m 666 "$ROOT/dev/null" c 1 3 || true

# pack
cd "$ROOT"
find . | cpio -o --format=newc | gzip -9 > "$OUT/initramfs.cpio.gz"
cd "$TOP"

echo "Artifacts in $OUT: vmlinuz-$KVER, initramfs.cpio.gz"
