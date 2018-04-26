i=0
while(1>0)
do
i=`expr $i + 1`
echo "monkey tick $i"
~/Android/Sdk/platform-tools/adb shell monkey -p com.iqiyi.halberd.demo -v -v 50000 >&1 >>mokey.log
~/Android/Sdk/platform-tools/adb shell am force-stop com.iqiyi.halberd.demo
done
