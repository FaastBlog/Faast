---
layout: post
current: post
cover:  assets/images/advanced.jpg
navigation: True
title: Netzwerk Analyse
date: 2019-04-01 12:56:00
tags: [Network]
class: post-template
subclass: 'post tag-network'
author: kilian
published: True
---

# Bericht Netzwerkanalyse

## Netzwerkkonfiguration

### Konfiguration Auslesen

```bash
ipconfig /all
```

**Output**

```bash
Windows-IP-Konfiguration

   Hostname  . . . . . . . . . . . . : ELME-111
   Prim„res DNS-Suffix . . . . . . . : schule.local
   Knotentyp . . . . . . . . . . . . : Hybrid
   IP-Routing aktiviert  . . . . . . : Nein
   WINS-Proxy aktiviert  . . . . . . : Nein
   DNS-Suffixsuchliste . . . . . . . : schule.local

Ethernet-Adapter LAN-Verbindung:

   Verbindungsspezifisches DNS-Suffix: schule.local
   Connection
   Physikalische Adresse . . . . . . : 90-B1-1C-5C-07-F4
   Verbindungslokale IPv6-Adresse  . : fe80::b1d7:da26:3873:fc51%12(Bevorzugt) 
   IPv4-Adresse  . . . . . . . . . . : 172.17.67.120(Bevorzugt) 
   Subnetzmaske  . . . . . . . . . . : 255.255.255.0
   Standardgateway . . . . . . . . . : 172.17.67.254
   DHCP-Server . . . . . . . . . . . : 192.168.121.4
   DNS-Server  . . . . . . . . . . . : 192.168.121.4
                                       192.168.121.2
```

----

## Testen der Verbindung

### Ping IP
```bash
    ping 172.17.67.110
    ping ali.in
    ping orf.at
```
**Output**

Schulrechner:
```bash
Ping wird ausgeführt für 172.17.67.110 mit 32 Bytes Daten:
    Antwort von 172.17.67.110: Bytes=32 Zeit=2ms TTL=128
    Antwort von 172.17.67.110: Bytes=32 Zeit<1ms TTL=128
    Antwort von 172.17.67.110: Bytes=32 Zeit<1ms TTL=128
    Antwort von 172.17.67.110: Bytes=32 Zeit<1ms TTL=128

    Ping-Statistik für 172.17.67.110:
        Pakete: Gesendet = 4, Empfangen = 4, Verloren = 0
        (0% Verlust),
    Ca. Zeitangaben in Millisek.:
        Minimum = 0ms, Maximum = 2ms, Mittelwert = 0ms
```

Ali.it
```bash
Ping wird ausgeführt für ali.in [91.195.240.126] mit 32 Bytes Daten:
    Antwort von 91.195.240.126: Bytes=32 Zeit=26ms TTL=53
    Antwort von 91.195.240.126: Bytes=32 Zeit=25ms TTL=53
    Antwort von 91.195.240.126: Bytes=32 Zeit=27ms TTL=53
    Antwort von 91.195.240.126: Bytes=32 Zeit=25ms TTL=53

    Ping-Statistik für 91.195.240.126:
        Pakete: Gesendet = 4, Empfangen = 4, Verloren = 0
        (0% Verlust),
    Ca. Zeitangaben in Millisek.:
        Minimum = 25ms, Maximum = 27ms, Mittelwert = 25ms
```
Orf.at
```bash
Ping wird ausgeführt für orf.at [194.232.104.150] mit 32 Bytes Daten:
    Antwort von 194.232.104.150: Bytes=32 Zeit=13ms TTL=54
    Antwort von 194.232.104.150: Bytes=32 Zeit=5ms TTL=54
    Antwort von 194.232.104.150: Bytes=32 Zeit=7ms TTL=54
    Antwort von 194.232.104.150: Bytes=32 Zeit=6ms TTL=54

    Ping-Statistik für 194.232.104.150:
        Pakete: Gesendet = 4, Empfangen = 4, Verloren = 0
        (0% Verlust),
    Ca. Zeitangaben in Millisek.:
        Minimum = 5ms, Maximum = 13ms, Mittelwert = 7ms

```

### Analyse

Der Ping zum Schulrechner im internen Netzwerk benötigt maximal nur 2ms.

Zum externen Server vom ORF maximal 13ms.

Ein Ping an einen indischen Server benötigt fast 30ms.

----

## IP Trace

### Trace ausführen

```bash
    tracert www.htl-wels.at
    tracert orf.at
    tracert ali.in
```

**Output**

www.htl-wels.at:
```bash
Routenverfolgung zu www.htl-wels.at [10.34.57.251] über maximal 30 Abschnitte:

  1    <1 ms    <1 ms    <1 ms  172.17.67.254 
  2    <1 ms    <1 ms    <1 ms  10.34.57.251 
```

orf.at:
```bash
Routenverfolgung zu orf.at [194.232.104.150] über maximal 30 Abschnitte:

  1    <1 ms    <1 ms    <1 ms  172.17.67.254 
  2    <1 ms    <1 ms    <1 ms  10.34.57.254 
  3     2 ms     2 ms     2 ms  10.201.8.254 
  4     1 ms     1 ms     1 ms  gatekeeper-wan.asn-linz.ac.at [172.27.1.200] 
  5    14 ms    14 ms     7 ms  router.asn-linz.ac.at [193.170.68.254] 
  6     2 ms     2 ms     2 ms  linz1.aco.net [193.171.22.49] 
  7     5 ms     9 ms    10 ms  wien2.aco.net [193.171.14.169] 
  8     5 ms     5 ms     5 ms  193.171.14.170 
  9     7 ms     5 ms     6 ms  rou-vie-pe-101.apa.net [194.158.150.61] 
 10    10 ms     5 ms     5 ms  c65-rz1-1.apa.net [194.158.150.113] 
 11     5 ms     5 ms     5 ms  orf.at [194.232.104.150] 
```

ali.in:
```bash
Routenverfolgung zu ali.in [91.195.240.126] über maximal 30 Abschnitte:

  1    <1 ms    <1 ms    <1 ms  172.17.67.254 
  2    <1 ms    <1 ms    <1 ms  10.34.57.254 
  3     2 ms     3 ms     2 ms  10.201.8.254 
  4     1 ms     2 ms     1 ms  gatekeeper-wan.asn-linz.ac.at [172.27.1.200] 
  5     2 ms     2 ms     2 ms  router.asn-linz.ac.at [193.170.68.254] 
  6     2 ms     2 ms     2 ms  linz1.aco.net [193.171.22.49] 
  7     5 ms     5 ms     6 ms  vlan301.wien21.aco.net [212.73.203.18] 
  8     5 ms     5 ms     5 ms  et-0-0-70-3-301.bar4.vienna1.level3.net [212.73.203.17] 
  9    26 ms    25 ms    25 ms  ae-2-18.bar2.munich1.level3.net [4.69.153.249] 
 10    25 ms    25 ms    25 ms  ae-2-18.bar2.munich1.level3.net [4.69.153.249] 
 11    25 ms    25 ms    25 ms  195.122.182.154 
 12    26 ms    27 ms    26 ms  91.195.241.102 
 13    28 ms    27 ms    30 ms  91.195.241.118 
 14    25 ms    25 ms    26 ms  91.195.240.126
 ... and more
```

---

## MAC und IP zuordnung

```bash
    arp -a
```

**Output**

```bash
Schnittstelle: 172.17.67.120 --- 0xc
  Internetadresse       Physische Adresse     Typ
  172.17.67.94          90-b1-1c-5d-d6-af     dynamisch 
  172.17.67.108         90-b1-1c-5c-5b-3c     dynamisch 
  172.17.67.110         90-b1-1c-5d-e0-e4     dynamisch 
  172.17.67.111         90-b1-1c-5d-dd-a1     dynamisch 
  172.17.67.116         18-03-73-3b-33-92     dynamisch 
  172.17.67.117         90-b1-1c-5d-d5-5d     dynamisch 
  172.17.67.254         44-1e-a1-9b-a0-00     dynamisch 
  172.17.67.255         ff-ff-ff-ff-ff-ff     statisch  
  224.0.0.22            01-00-5e-00-00-16     statisch  
  224.0.0.251           01-00-5e-00-00-fb     statisch  
  224.0.0.252           01-00-5e-00-00-fc     statisch  
  224.0.1.129           01-00-5e-00-01-81     statisch  
  255.255.255.255       ff-ff-ff-ff-ff-ff     statisch  
```

----

## Aktive Verbindungen anzeigen

```bash
    netstat -an
```

**Output**

```bash
Aktive Verbindungen

  Proto  Lokale Adresse         Remoteadresse          Status
  TCP    0.0.0.0:102            0.0.0.0:0              ABH™REN
  TCP    0.0.0.0:135            0.0.0.0:0              ABH™REN
  TCP    0.0.0.0:445            0.0.0.0:0              ABH™REN
  TCP    0.0.0.0:2343           0.0.0.0:0              ABH™REN
  TCP    0.0.0.0:3389           0.0.0.0:0              ABH™REN
  TCP    0.0.0.0:3580           0.0.0.0:0              ABH™REN
    ...
  TCP    127.0.0.1:44080        127.0.0.1:49918        HERGESTELLT
  TCP    127.0.0.1:44080        127.0.0.1:50223        HERGESTELLT
  TCP    127.0.0.1:44080        127.0.0.1:51117        HERGESTELLT
  TCP    127.0.0.1:44080        127.0.0.1:51244        FIN_WARTEN_2
  TCP    127.0.0.1:49159        127.0.0.1:49160        HERGESTELLT
  TCP    127.0.0.1:49160        127.0.0.1:49159        HERGESTELLT
  TCP    127.0.0.1:49166        127.0.0.1:49167        HERGESTELLT
  TCP    127.0.0.1:49167        127.0.0.1:49166        HERGESTELLT
  TCP    127.0.0.1:49168        127.0.0.1:61900        HERGESTELLT
  TCP    127.0.0.1:49169        127.0.0.1:49170        HERGESTELLT
  TCP    127.0.0.1:49170        127.0.0.1:49169        HERGESTELLT
  TCP    127.0.0.1:49181        0.0.0.0:0              ABH™REN
  TCP    127.0.0.1:49181        127.0.0.1:49202        HERGESTELLT
  TCP    127.0.0.1:49181        127.0.0.1:49204        HERGESTELLT
  TCP    127.0.0.1:49181        127.0.0.1:49210        HERGESTELLT
  TCP    127.0.0.1:49181        127.0.0.1:49211        HERGESTELLT
  TCP    127.0.0.1:49181        127.0.0.1:49212        HERGESTELLT
  TCP    127.0.0.1:49181        127.0.0.1:49213        HERGESTELLT
  TCP    127.0.0.1:49186        0.0.0.0:0              ABH™REN
  TCP    127.0.0.1:49186        127.0.0.1:49273        SCHLIESSEN_WARTEN
  TCP    127.0.0.1:49186        127.0.0.1:49290        SCHLIESSEN_WARTEN
  TCP    127.0.0.1:49187        127.0.0.1:49188        HERGESTELLT
  TCP    127.0.0.1:49188        127.0.0.1:49187        HERGESTELLT
  TCP    127.0.0.1:49189        0.0.0.0:0              ABH™REN
  TCP    127.0.0.1:49197        0.0.0.0:0              ABH™REN
  TCP    127.0.0.1:49198        0.0.0.0:0              ABH™REN
  TCP    127.0.0.1:49202        127.0.0.1:49181        HERGESTELLT
  TCP    127.0.0.1:49204        127.0.0.1:49181        HERGESTELLT
  TCP    127.0.0.1:49210        127.0.0.1:49181        HERGESTELLT
  TCP    127.0.0.1:49211        127.0.0.1:49181        HERGESTELLT
  TCP    127.0.0.1:49212        127.0.0.1:49181        HERGESTELLT
  TCP    127.0.0.1:49213        127.0.0.1:49181        HERGESTELLT
  TCP    127.0.0.1:49273        127.0.0.1:49186        FIN_WARTEN_2
  TCP    127.0.0.1:49274        127.0.0.1:49275        HERGESTELLT
  TCP    127.0.0.1:49275        127.0.0.1:49274        HERGESTELLT
  TCP    127.0.0.1:49278        127.0.0.1:61900        FIN_WARTEN_2
  TCP    127.0.0.1:49279        127.0.0.1:49280        HERGESTELLT
  TCP    127.0.0.1:49280        127.0.0.1:49279        HERGESTELLT
  TCP    127.0.0.1:49290        127.0.0.1:49186        FIN_WARTEN_2
  TCP    127.0.0.1:49291        127.0.0.1:49292        HERGESTELLT
  TCP    127.0.0.1:49292        127.0.0.1:49291        HERGESTELLT
    ...
  TCP    127.0.0.1:51231        127.0.0.1:44080        WARTEND
  TCP    127.0.0.1:51233        127.0.0.1:44080        WARTEND
  TCP    127.0.0.1:51235        127.0.0.1:51236        HERGESTELLT
  TCP    127.0.0.1:51236        127.0.0.1:51235        HERGESTELLT
  TCP    127.0.0.1:51244        127.0.0.1:44080        SCHLIESSEN_WARTEN
  TCP    127.0.0.1:51250        127.0.0.1:50000        WARTEND
  TCP    127.0.0.1:61900        0.0.0.0:0              ABH™REN
  TCP    127.0.0.1:61900        127.0.0.1:49168        HERGESTELLT
  TCP    127.0.0.1:61900        127.0.0.1:49278        SCHLIESSEN_WARTEN
  TCP    172.17.67.120:139      0.0.0.0:0              ABH™REN
  TCP    172.17.67.120:7030     0.0.0.0:0              ABH™REN
  TCP    172.17.67.120:49293    192.168.121.7:80       HERGESTELLT
  TCP    172.17.67.120:49305    192.168.121.2:445      HERGESTELLT
  TCP    172.17.67.120:49324    192.168.121.2:445      HERGESTELLT
  TCP    172.17.67.120:49336    192.168.121.2:445      HERGESTELLT
  TCP    172.17.67.120:49343    192.168.121.4:445      HERGESTELLT
  TCP    172.17.67.120:49354    192.168.121.25:49158   HERGESTELLT
  TCP    172.17.67.120:49356    192.168.121.4:49180    HERGESTELLT
  TCP    172.17.67.120:49842    18.184.173.70:443      SCHLIESSEN_WARTEN
  TCP    172.17.67.120:49843    52.59.77.194:443       SCHLIESSEN_WARTEN
  TCP    172.17.67.120:49919    192.168.121.20:8080    HERGESTELLT
  TCP    172.17.67.120:49930    192.168.121.7:443      SCHLIESSEN_WARTEN
  TCP    172.17.67.120:50224    192.168.121.20:8080    HERGESTELLT
  TCP    172.17.67.120:51118    192.168.121.20:8080    HERGESTELLT
  TCP    172.17.67.120:51232    192.168.121.20:8080    WARTEND
  TCP    172.17.67.120:51234    192.168.121.20:8080    WARTEND
  TCP    172.17.67.120:51261    192.168.121.25:445     HERGESTELLT
  TCP    [::]:135               [::]:0                 ABH™REN
  TCP    [::]:445               [::]:0                 ABH™REN
  TCP    [::]:3389              [::]:0                 ABH™REN
  TCP    [::]:4840              [::]:0                 ABH™REN
  TCP    [::]:4843              [::]:0                 ABH™REN
  TCP    [::]:22350             [::]:0                 ABH™REN
    ...
  TCP    [::1]:22350            [::1]:49370            HERGESTELLT
  TCP    [::1]:49155            [::1]:49156            HERGESTELLT
  TCP    [::1]:49156            [::1]:49155            HERGESTELLT
  TCP    [::1]:49161            [::1]:49162            HERGESTELLT
  TCP    [::1]:49162            [::1]:49161            HERGESTELLT
  TCP    [::1]:49163            [::1]:49164            HERGESTELLT
  TCP    [::1]:49164            [::1]:49163            HERGESTELLT
  TCP    [::1]:49177            [::1]:49178            HERGESTELLT
  TCP    [::1]:49178            [::1]:49177            HERGESTELLT
  TCP    [::1]:49183            [::1]:49184            HERGESTELLT
  TCP    [::1]:49184            [::1]:49183            HERGESTELLT
  TCP    [::1]:49370            [::1]:22350            HERGESTELLT
  UDP    0.0.0.0:123            *:*                    
  UDP    0.0.0.0:500            *:*                    
  UDP    0.0.0.0:1434           *:*                    
  UDP    0.0.0.0:2343           *:*                    
  UDP    0.0.0.0:4500           *:*                    
  UDP    0.0.0.0:5000           *:*                    
    ...      
```

### Analyse

Zeigt die aktiven TCP und UDP Verbindungen an.
+ Hergestellt - Aktive Verbindung
+ Hören - Hört den Port ab
+ Warten - Wartet auf Verbindung
+ Schließen - Wartet auf Schließung

```bash
    IP:PORT ... Darstellung
```

---
